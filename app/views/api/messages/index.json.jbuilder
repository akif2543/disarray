@messages.reverse_each do |m|
  json.messages do
    json.partial! "api/messages/message", message: m
  end

  json.users do
    json.cache! m.author do
      json.partial! "api/users/user", user: m.author
    end
  end
end