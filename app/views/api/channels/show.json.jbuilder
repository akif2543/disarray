json.action "receive channel"

json.channel do
  json.set! @channel.id do
    json.partial! "api/channels/channel", channel: @channel
    json.visited true
  end
end

@channel.messages.each do |m|
  json.messages do
    json.partial! "api/messages/message", message: m
  end

  json.users do
    json.cache! m.author, expires_in: 1.hour do
      json.partial! "api/users/user", user: m.author
    end
  end
end