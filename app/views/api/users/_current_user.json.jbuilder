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
    json.cache! f, expires_in: 10.minutes do
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
      json.partial! "api/servers/server.json.jbuilder", server: server
    end
  end

  json.users do 
    server.get_members.each do |m|
      json.cache! m, expires_in: 10.minutes do
        json.partial! "api/users/user.json.jbuilder", user: m
      end
    end
  end

  
  server.get_channels.each do |c|
    json.channels do
      json.set! c.id do 
        json.partial! "api/channels/channel.json.jbuilder", channel: c
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
      json.partial! "api/conversations/conversation.json.jbuilder", c: c
    end
  end

  json.users do 
    c.get_members.each do |m|
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