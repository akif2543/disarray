json.channel do
  json.set! @channel.id do
    json.partial! "api/channels/channel", channel: @channel
  end
end

json.messages do
  @channel.messages.each do |m|
    json.partial! "api/messages/message", message: m
  end
end