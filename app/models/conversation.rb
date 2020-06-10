class Conversation < ApplicationRecord

  has_many :memberships, as: :subscribeable, dependent: :destroy
  has_many :members, through: :memberships, source: :member
  has_many :messages, as: :messageable, dependent: :destroy

  def bundle(convo)
    user1_id, user2_id, body = *convo
    Membership.create([{member_id: user1_id.last, subscribeable: self}, {member_id: user2_id.last, subscribeable: self}])
    Message.create(author_id: user1_id.last, body: body.last, messageable: self) if body
  end
end
