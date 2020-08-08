json.extract! server, :id, :name, :join_code
json.icon(url_for(server.icon)) if server.icon.attached?
json.owner server.owner_id
json.members server.members.map(&:id)
json.channels server.channels.map(&:id)
json.active server.channels.first.id