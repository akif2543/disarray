class Channel < ApplicationRecord
  validates :name, :server_id, presence: true

  belongs_to :server, foreign_key: :server_id, class_name: :Server
  has_many :members, through: :server, source: :members
  has_many :messages, -> { order("created_at DESC").limit(20).order("created_at ASC") }, as: :messageable, dependent: :destroy
end
