require "open-uri"

class User < ApplicationRecord
  attr_reader :password
  validates :discriminator, :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :username, presence: true, length: {minimum: 2, maximum: 32}
  validates :password, length: {minimum: 6, maximum: 128}, allow_nil: true

  after_initialize :ensure_session_token, :ensure_discriminator, :ensure_avatar

  has_many :owned_servers, foreign_key: :owner_id, class_name: :Server, dependent: :destroy
  has_many :memberships, foreign_key: :member_id, class_name: :Membership, dependent: :destroy
  has_many :servers, through: :memberships, source: :subscribeable, source_type: :Server
  has_many :conversations, through: :memberships, source: :subscribeable, source_type: :Conversation
  has_many :owned_conversations, foreign_key: :owner_id, class_name: :Conversation, dependent: :destroy
  has_many :channels, through: :servers, source: :channels
  has_many :messages, foreign_key: :author_id, class_name: :Message, dependent: :destroy

  has_one_attached :avatar

  has_friendship

  def self.discordify_errors(errors)
    errors.map do |e|
      case e
      when "Email has already been taken"
        ["email", "Email is already registered"]
      when "Username is too short (minimum is 2 characters)"
        ["username", "Must be between 2 and 32 in length"]
      when "Username is too long (maximum is 32 characters)"
        ["username, ""Must be between 2 and 32 in length"]
      when "Password is too short (minimum is 6 characters)"
        ["password", "Must be between 6 and 128 in length"]
      when "Password is too long (maximum is 128 characters)"
        ["password", "Must be between 6 and 128 in length"]
      else
        e
      end
    end
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  def block(user)
    self.remove_friend(user) if self.friends_with?(user)
    user.friend_request(self) unless self.pending_friends.include?(user) || self.requested_friends.include?(user)
    self.block_friend(user)  
  end

  def get_conversations
    Rails.cache.fetch([cache_key, __method__], expires_in: 1.hour) do
      self.conversations.includes(:members)
    end
  end

  def get_servers
    Rails.cache.fetch([cache_key, __method__], expires_in: 1.hour) do
      self.servers.includes(:members, :channels)
    end
  end

  def conversation_ids
    get_conversations
      .sort { |a, b| b.updated_at <=> a.updated_at }
      .map(&:id)
  end

  def conversees
    conversees = {}
    get_conversations.each do |c|
      unless c.group
        u = c.members.find { |m| m.id != self.id}
        conversees[u.id] = c.id unless u.nil?
      end
    end
    conversees
  end

  def server_aliases
    # Rails.cache.fetch([cache_key, __method__], expires_in: 10.minutes) do
      aliases = {}
      self.memberships.each do |m|
        aliases[m.subscribeable_id] = m.alias if m.subscribeable_type == "Server"
      end
      aliases
    # end
  end

  def is_member?(server)
    self.servers.include?(server)
  end

  def mutual_friends(other_user)
    self.friends.select { |f| other_user.friends.include?(f) }.map(&:id)
  end

  def mutual_server_aliases(other_user)
    other_aliases = other_user.server_aliases
    self.server_aliases.select { |k, v| other_aliases.has_key?(k) }
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def ensure_discriminator
    self.discriminator ||= discriminate
  end

  def discriminate
    disc = []
    disc << rand(1...10)
    3.times { disc << rand(10)}
    disc = disc.join.to_i
    discriminate if User.find_by(discriminator: disc)
    disc
  end

  def ensure_avatar
    self.avatar.attach(io: random_avatar, filename: "default_avatar.png") unless self.avatar.attached?
  end

  def generate_session_token
    SecureRandom::urlsafe_base64
  end

  def random_avatar
    av = ['https://disarray-chat-seeds.s3.amazonaws.com/user_1.png', 'https://disarray-chat-seeds.s3.amazonaws.com/user_2.png', 'https://disarray-chat-seeds.s3.amazonaws.com/user_3.png', 'https://disarray-chat-seeds.s3.amazonaws.com/user_4.png'].sample
    open(av)
  end
end
