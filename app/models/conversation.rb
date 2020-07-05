class Conversation < ApplicationRecord

  has_many :memberships, as: :subscribeable, dependent: :destroy
  has_many :members, through: :memberships, source: :member
  has_many :messages, -> { order("created_at DESC").limit(15).order("created_at ASC") }, as: :messageable, dependent: :destroy

  def bundle(user1_id, user2_id, body = nil)
    Membership.create([{member_id: user1_id, subscribeable: self}, {member_id: user2_id, subscribeable: self}])
    Message.create(author_id: user1_id, body: body, messageable: self) if body
  end
end
