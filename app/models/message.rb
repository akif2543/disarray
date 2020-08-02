class Message < ApplicationRecord
  attr_accessor :remove

  validates :body, :author_id, :messageable_type, :messageable_id, presence: true

  belongs_to :messageable, polymorphic: true, touch: true
  belongs_to :author, foreign_key: :author_id, class_name: :User
end
