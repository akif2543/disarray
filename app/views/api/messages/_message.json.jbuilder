json.set! message.id do
  json.extract! message, :id, :body
  json.author message.author_id
  json.textChannel message.messageable_type == "Channel"
  json.messageableId message.messageable_id
  json.createdAt message.created_at
  json.updatedAt message.updated_at
end