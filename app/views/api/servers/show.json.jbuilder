json.action "receive server"

json.server do
  json.set! @server.id do
    json.id @server.id
    json.name @server.name
    json.icon(url_for(@server.icon)) if @server.icon.attached?
    json.owner @server.owner_id
    json.joinCode @server.join_code
    json.members @server.get_members.map(&:id)
    json.channels @server.get_channels.map(&:id)
    json.active @server.get_channels.first.id
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
    json.cache! member do
      json.partial! "api/users/user", user: member
    end
  end
end