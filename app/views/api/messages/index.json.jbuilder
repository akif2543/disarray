@messages.reverse_each do |m|
  json.messages do
    json.partial! "api/messages/message", message: m
  end

  json.users do
    Rails.cache.fetch(m.author, expires_in: 10.minutes) do
      json.partial! "api/users/user", user: m.author
    end
  end
end