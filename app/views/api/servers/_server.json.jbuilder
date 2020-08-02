json.extract! server, :id, :name, :join_code
json.icon(url_for(server.icon)) if server.icon.attached?
json.owner server.owner_id
json.members server.get_members.map(&:id)
json.channels server.get_channels.map(&:id)
json.active server.get_channels.first.id