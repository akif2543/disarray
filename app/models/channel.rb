class Channel < ApplicationRecord
  validates :name, :server_id, presence: true

  belongs_to :server, foreign_key: :server_id, class_name: :Server
  has_many :members, through: :server, source: :members
  has_many :messages, as: :messageable, dependent: :destroy
end


# -> { order("created_at DESC").limit(10).order("created_at ASC") }