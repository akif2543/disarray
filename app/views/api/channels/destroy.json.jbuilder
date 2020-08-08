json.action "remove channel"
json.id @channel.id
json.server @channel.server_id
json.active @server.channels.first.id