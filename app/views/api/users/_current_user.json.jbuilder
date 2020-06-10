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

user.conversations.each do |c|
  json.conversations do
    json.set! c.id do
      json.id c.id
      json.members c.members.map(&:id)
      json.messages []
    end
  end

  json.users do 
    c.members.each do |m|
      if m.id != user.id
        json.set! m.id do
          json.extract! m, :id, :username, :discriminator, :avatar
          json.servers m.servers.map(&:id)
          json.conversations m.conversations.map(&:id)
        end
      end
    end
  end
end