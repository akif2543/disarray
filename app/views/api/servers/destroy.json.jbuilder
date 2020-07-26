json.action "remove server"
json.id @server.id 
json.members @server.get_members.map(&:id)
json.channels @server.get_channels.map(&:id)