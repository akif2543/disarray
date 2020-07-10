json.message do
  json.set! message.id do 
    json.extract! message, :id, :body
    json.author message.author_id
    json.textChannel message.messageable_type == 'Channel'
    json.messageableId message.messageable_id
    json.createdAt message.created_at
    json.updatedAt message.updated_at
  end
end

json.user do
  json.partial! "api/users/user", user: message.author
end

if message.delete
  json.delete true
end