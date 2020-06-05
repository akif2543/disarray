json.servers do
  @servers.each do |server|
    json.set! server.id do
      json.id server.id
      json.name server.name
      json.owner server.owner_id
      json.members []
    end
  end
end