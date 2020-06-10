json.user do
  json.set! user.id do
    json.extract! user, :id, :username, :discriminator, :email, :avatar
    json.servers user.servers.map(&:id) 
    json.conversations user.conversations.map(&:id)
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

json.conversations do
  user.conversations.each do |c|
    json.set! c.id do
      json.id c.id
      json.members c.members.map(&:id)
      json.messages []
    end
  end
end