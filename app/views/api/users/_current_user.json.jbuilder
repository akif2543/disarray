json.user do
  json.set! user.id do
    json.extract! user, :id, :username, :discriminator, :email, :avatar
    json.servers user.servers.map(&:id) 
  end
end

json.servers do
  user.servers.each do |server|
    json.set! server.id do
      json.id server.id
      json.name server.name
      json.joinCode server.join_code
      json.members []
      json.channels server.channels.map(&:id)
    end
  end
end