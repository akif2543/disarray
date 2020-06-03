class Membership < ApplicationRecord
  validates :member_id, :subscribeable_type, :subscribeable_id, presence: true

  belongs_to :subscribeable, polymorphic: true
  belongs_to :member, foreign_key: :member_id, class_name: :User

end
