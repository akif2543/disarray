class Message < ApplicationRecord
  attr_reader :delete

  validates :body, :author_id, :messageable_type, :messageable_id, presence: true

  belongs_to :messageable, polymorphic: true
  belongs_to :author, foreign_key: :author_id, class_name: :User

  def delete=(bool)
    @delete = bool
  end
end
