class User < ApplicationRecord
  attr_reader :password
  validates :discriminator, :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, :avatar, presence: true
  validates :username, presence: true, length: {minimum: 2, maximum: 32}
  validates :password, length: {minimum: 6, maximum: 128}, allow_nil: true

  after_initialize :ensure_session_token, :ensure_discriminator, :ensure_avatar

  has_many :owned_servers, foreign_key: :owner_id, class_name: :Server
  has_many :memberships, foreign_key: :member_id, class_name: :Membership, dependent: :destroy
  has_many :servers, through: :memberships, source: :subscribeable, source_type: :Server
  has_many :channels, through: :servers, source: :channels

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

  def is_member?(server)
    self.servers.include?(server)
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
    4.times { disc << rand(10)}
    disc = disc.join
    discriminate if disc.length != 4
    discriminate if User.find_by(discriminator: disc)
    disc.to_i
  end

  def ensure_avatar
    self.avatar ||= random_avatar
  end

  def generate_session_token
    SecureRandom::urlsafe_base64
  end

  def random_avatar
    av = ['user_1.png', 'user_2.png', 'user_3.png', 'user_2.png'].sample
    ActionController::Base.helpers.asset_url(av, type: :image)
  end
end
