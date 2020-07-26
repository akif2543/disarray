class Server < ApplicationRecord
  validates :name, :owner_id, presence: true
  validates :join_code, presence: true, uniqueness: true

  after_initialize :ensure_join_code

  belongs_to :owner, foreign_key: :owner_id, class_name: :User, touch: true
  has_many :memberships, as: :subscribeable, dependent: :destroy
  has_many :members, through: :memberships, source: :member
  has_many :channels, foreign_key: :server_id, class_name: :Channel, dependent: :destroy

  has_one_attached :icon

  def bundle
    Membership.create(member_id: self.owner_id, subscribeable: self)
    Channel.create(name: "general", server_id: self.id)
  end

  def get_members
    Rails.cache.fetch([cache_key, __method__], expires_in: 24.hours) do
      self.members
    end
  end

  def get_channels
    Rails.cache.fetch([cache_key, __method__], expires_in: 24.hours) do
      self.channels
    end
  end


  private

  def ensure_join_code 
    self.join_code ||= get_code
  end

  def get_code
    code = SecureRandom::urlsafe_base64(7)
    get_code if Server.find_by(join_code: code)
    code
  end
end
