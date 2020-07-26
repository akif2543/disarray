json.user do
  json.set! user.id do
    json.extract! user, :id, :username, :discriminator, :email, :online
    json.avatar url_for(user.avatar)
    json.servers user.server_aliases
    json.conversations user.conversation_ids
    json.conversees user.conversees
    json.friends user.friends.map(&:id)
    json.pendingIn user.requested_friends.map(&:id)
    json.pendingOut user.pending_friends.map(&:id)
    json.blocked user.blocked_friends.map(&:id)
  end
end

json.users do 
  user.friends.each do |f|
    json.cache! f do
      json.partial! "api/users/user.json.jbuilder", user: f
    end
  end

  (user.requested_friends + user.pending_friends).each do |f|
    json.set! f.id do
      json.extract! f, :id, :username, :discriminator
      json.avatar url_for(f.avatar)
    end
  end

  user.blocked_friends.each do |f|
    json.set! f.id do
      json.extract! f, :id, :username, :discriminator
      json.avatar url_for(f.avatar)
    end
  end
end

user.get_servers.each do |server|
  json.servers do
    json.set! server.id do
      json.id server.id
      json.name server.name
      json.icon(url_for(server.icon)) if server.icon.attached?
      json.owner server.owner_id
      json.joinCode server.join_code
      json.members server.get_members.map(&:id)
      json.channels server.get_channels.map(&:id)
      json.active server.get_channels.first.id
    end
  end

  json.users do 
    server.get_members.each do |m|
      json.cache! m do
        json.partial! "api/users/user.json.jbuilder", user: m
      end
    end
  end

  json.channels do
    server.get_channels.each do |c|
      json.set! c.id do 
        json.extract! c, :id, :name, :topic
        json.server c.server_id
        json.messages []
      end
    end
  end
end

user.get_conversations.each do |c|
  json.conversations do
    json.set! c.id do
      json.extract! c, :id, :group, :name
      json.icon(url_for(c.icon)) if c.group && c.icon.attached?
      json.owner c.owner_id
      json.members c.get_members.map(&:id)
      json.messages []
    end
  end

  json.users do 
    c.get_members.each do |m|
      json.cache! m do
        json.partial! "api/users/user.json.jbuilder", user: m
      end
    end
  end
end