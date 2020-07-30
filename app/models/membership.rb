class Membership < ApplicationRecord
  validates :subscribeable_type, :subscribeable_id, presence: true
  validates :member_id, presence: true, uniqueness: { scope: [:subscribeable_type, :subscribeable_id], message: "Already a member" }

  belongs_to :subscribeable, polymorphic: true, touch: true
  belongs_to :member, foreign_key: :member_id, class_name: :User, touch: true

end
