class Server < ApplicationRecord
  validates :name, :owner_id, presence: true

  belongs_to :owner, foreign_key: :owner_id, class_name: :User
  has_many :memberships, as: :subscribeable
  has_many :members, through: :memberships, source: :member

end
