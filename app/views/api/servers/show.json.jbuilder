json.action "receive server"

json.server do
  json.set! @server.id do
    json.partial! "api/servers/server", server: @server
  end
end

@server.get_channels.each do |c|
  json.channels do
    json.set! c.id do
      json.partial! "api/channels/channel", channel: c
    end
  end

  # json.messages do
  #   c.messages.each do |m|
  #     json.partial! "api/messages/message.json.jbuilder", message: m
  #   end
  # end
end

json.users do
  Rails.cache.fetch_multi(*@server.get_members, expires_in: 10.minutes) do |m|
    json.partial! "api/users/user", user: m
  end
end