@messages.reverse.each do |m|
  json.messages do
    json.partial! "api/messages/message", message: m
  end

  json.users do
    json.partial! "api/users/user", user: m.author
  end
end