class Conversation < ApplicationRecord
  validates :owner_id, presence: true

  belongs_to :owner, foreign_key: :owner_id, class_name: :User

  has_many :memberships, as: :subscribeable, dependent: :destroy
  has_many :members, through: :memberships, source: :member
  has_many :messages, -> { order("created_at DESC").limit(30) }, as: :messageable, dependent: :destroy

  has_one_attached :icon

  def get_members
    Rails.cache.fetch([cache_key, __method__], expires_in: 24.hours) do
      self.members
    end
  end

  def bundle(user1_id, user2_id, body = nil)
    Membership.create([{member_id: user1_id, subscribeable: self}, {member_id: user2_id, subscribeable: self}])
    Message.create(author_id: user1_id, body: body, messageable: self) if body
  end

  def group_bundle(ids)
    Membership.create(ids.map { |id| { member_id: id, subscribeable: self } })
  end

  def new_owner
    lucky = self.members.sample
    new_owner if lucky == self.owner
    self.update(owner_id: lucky.id)
  end
end