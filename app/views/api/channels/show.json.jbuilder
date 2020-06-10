json.channel do
  json.set! @channel.id do
    json.partial! "api/channels/channel", channel: @channel
  end
end

@channel.messages.each do |m|
  json.messages do
    json.partial! "api/messages/message", message: m
  end

  json.users do
    json.partial! "api/users/user", user: m.author
  end
end