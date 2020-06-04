class User < ApplicationRecord
  attr_reader :password
  validates :discriminator, :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :username, presence: true, length: {minimum: 2, maximum: 32}
  validates :password, length: {minimum: 6, maximum: 128}, allow_nil: true

  after_initialize :ensure_session_token, :ensure_discriminator

  has_many :owned_servers, foreign_key: :owner_id, class_name: :Server
  has_many :memberships, foreign_key: :member_id, class_name: :Membership
  has_many :servers, through: :memberships, source: :subscribeable, source_type: :Server

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
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

  def generate_session_token
    SecureRandom::urlsafe_base64
  end

  def discriminate
    disc = []
    4.times { disc << rand(10)}
    disc = disc.join
    discriminate if User.find_by(discriminator: disc)
    disc
  end
end
