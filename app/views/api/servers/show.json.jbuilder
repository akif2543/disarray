json.action "receive server"

json.server do
  json.set! @server.id do
    json.partial! "api/servers/server", server: @server
  end
end

json.channels do
  @server.get_channels.each do |c|
    json.set! c.id do
      json.partial! "api/channels/channel", channel: c
    end
  end
end

json.users do
  @server.get_members.each do |member|
    json.cache! [member, member.online] do
      json.partial! "api/users/user", user: member
    end
  end
end