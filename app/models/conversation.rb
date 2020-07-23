class Conversation < ApplicationRecord
  validates :owner_id, presence: true

  belongs_to :owner, foreign_key: :owner_id, class_name: :User

  has_many :memberships, as: :subscribeable, dependent: :destroy
  has_many :members, through: :memberships, source: :member
  has_many :messages, -> { order("created_at DESC").limit(20).order("created_at ASC") }, as: :messageable, dependent: :destroy

  has_one_attached :icon

  def bundle(user1_id, user2_id, body = nil)
    Membership.create([{member_id: user1_id, subscribeable: self}, {member_id: user2_id, subscribeable: self}])
    Message.create(author_id: user1_id, body: body, messageable: self) if body
  end

  def group_bundle(ids)
    Membership.create(ids.map { |id| { member_id: id, subscribeable: self } })
  end
end
