json.message do
  json.set! message.id do 
    json.extract! message, :id, :body, :messageable_id, :created_at, :updated_at
    json.author message.author_id
    json.textChannel message.messageable_type == 'Channel'
  end
end

json.user do
  json.cache! message.author, expires_in: 1.hour do
    json.partial! "api/users/user", user: message.author
  end
end

if message.remove
  json.remove true
end