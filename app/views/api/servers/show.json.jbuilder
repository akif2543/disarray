json.action "receive server"

json.server do
  json.set! @server.id do
    json.id @server.id
    json.name @server.name
    json.icon(url_for(@server.icon)) if @server.icon.attached?
    json.owner @server.owner_id
    json.joinCode @server.join_code
    json.members @server.members.map(&:id)
    json.channels @server.channels.map(&:id)
    json.active @server.channels.first.id
  end
end

json.channels do
  @server.channels.each do |c|
    json.set! c.id do
      json.partial! "api/channels/channel", channel: c
    end
  end
end

json.users do
  @server.members.each do |member|
    json.partial! "api/users/user", user: member
  end
end