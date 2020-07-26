json.action "remove server"
json.id @server.id 
json.members @server.members.map(&:id)
json.channels @server.channels.map(&:id)