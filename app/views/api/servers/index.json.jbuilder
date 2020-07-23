json.servers do
  @servers.each do |server|
    json.set! server.id do
      json.id server.id
      json.name server.name
      json.icon(url_for(server.icon)) if server.icon.attached?
      json.owner server.owner_id
      json.joinCode server.join_code
      json.members []
    end
  end
end