json.set! message.id do
  json.extract! message, :id, :body, :messageable_id, :created_at, :updated_at
  json.author message.author_id
  json.textChannel message.messageable_type == "Channel"
end