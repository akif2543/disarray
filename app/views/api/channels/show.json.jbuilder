json.channel do
  json.set! @channel.id do
    json.partial! "api/channels/channel", channel: @channel
  end
end