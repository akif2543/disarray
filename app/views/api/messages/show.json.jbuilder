json.message do
  json.partial! "api/messages/message", message: @message
end

json.user do
  json.cache! [@message.author, @message.author.online], expires_in: 10.minutes do
    json.partial! "api/users/user", user: @message.author
  end
end
