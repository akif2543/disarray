json.user do
  json.cache! ['cu', user], expires_in: 1.hour do
    json.set! user.id do
      json.extract! user, :id, :username, :discriminator, :email, :online
      json.avatar url_for(user.avatar)
      json.servers user.server_aliases
      json.conversations user.conversation_ids
      json.conversees user.conversees
      json.friends user.friends.map(&:id)
      json.pendingIn user.requested_friends.map(&:id)
      json.pendingOut user.pending_friends.map(&:id)
      json.blocked user.blocked_friends.map { |u| [u.id, true] }.to_h
    end
  end
end

json.users do
  user.friends.each do |friend|
    json.cache! friend, expires_in: 10.minutes do
      json.partial! "api/users/user.json.jbuilder", user: friend
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
      json.extract! f, :id, :username, :discriminator, :online
      json.avatar url_for(f.avatar)
    end
  end
end

user.get_servers.each do |server|
  json.servers do
    json.set! server.id do
      json.cache! server, expires_in: 10.minutes do
        json.partial! "api/servers/server.json.jbuilder", server: server
      end
      json.hasUnreads user.updated_at < server.updated_at
    end
  end

  json.users do
    server.members.each do |m|
      json.cache! [m, m.online], expires_in: 10.minutes do
        json.partial! "api/users/user.json.jbuilder", user: m
      end
    end
  end

  
  server.channels.each do |c|
    json.channels do
      json.set! c.id do 
        json.partial! "api/channels/channel.json.jbuilder", channel: c
        json.hasUnreads user.updated_at < c.updated_at
      end
    end
    
    json.messages do
      c.messages.each do |m|
        json.partial! "api/messages/message.json.jbuilder", message: m
      end
    end
  end
end

user.get_conversations.each do |c|
  json.conversations do
    json.set! c.id do
      json.cache! c, expires_in: 10.minutes do
        json.partial! "api/conversations/conversation.json.jbuilder", c: c
      end
      json.messages c.messages.reverse.map(&:id)
      json.unreads user.updated_at < c.updated_at ? 1 : 0
    end
  end

  json.users do 
    c.members.each do |m|
      json.cache! m, expires_in: 10.minutes do
        json.partial! "api/users/user.json.jbuilder", user: m
      end
    end
  end

  json.messages do
    c.messages.each do |m|
      json.partial! "api/messages/message.json.jbuilder", message: m
    end
  end
end