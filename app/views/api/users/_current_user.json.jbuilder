json.user do
  json.set! user.id do
    json.extract! user, :id, :username, :discriminator, :email, :online
    json.avatar url_for(user.avatar)
    json.servers user.server_aliases

    conversations = []
    conversees = {}
    user.conversations.each do |c|
      conversations << c.id
      unless c.group
        u = c.members.find { |m| m.id != user.id}
        conversees[u.id] = c.id
      end
    end

    json.conversations conversations
    json.conversees conversees
    json.friends user.friends.map(&:id)
    json.pendingIn user.requested_friends.map(&:id)
    json.pendingOut user.pending_friends.map(&:id)
    json.blocked user.blocked_friends.map(&:id)
  end
end

json.users do 
  user.friends.each do |f|
    json.set! f.id do
      json.extract! f, :id, :username, :discriminator, :online
      json.avatar url_for(f.avatar)
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

user.servers.each do |server|
  json.servers do
    json.set! server.id do
      json.id server.id
      json.name server.name
      json.icon(url_for(server.icon)) if server.icon.attached?
      json.owner server.owner_id
      json.joinCode server.join_code
      json.members server.members.map(&:id)
      json.channels server.channels.map(&:id)
      json.active server.channels.first.id
    end
  end

  json.users do 
    server.members.each do |m|
      json.set! m.id do
        json.extract! m, :id, :username, :discriminator, :online
        json.avatar url_for(m.avatar)
        json.servers m.server_aliases
      end
    end
  end
end

user.channels.each do |c|
  json.channels do
    json.set! c.id do 
      json.extract! c, :id, :name, :topic
      json.server c.server_id
      json.messages []
      # c.messages.map(&:id)
    end
  end

  # json.messages do
  #   c.messages.each do |m|
  #     json.set! m.id do
  #       json.extract! m, :id, :body
  #       json.author m.author_id
  #       json.textChannel true
  #       json.messageableId m.messageable_id
  #       json.createdAt m.created_at
  #       json.updatedAt m.updated_at
  #     end
  #   end
  # end
end

user.conversations.each do |c|
  json.conversations do
    json.set! c.id do
      json.extract! c, :id, :group, :name
      json.icon(url_for(c.icon)) if c.group && c.icon.attached?
      json.owner c.owner_id
      json.members c.members.map(&:id)
      json.messages []
      # c.messages.map(&:id)
    end
  end

  json.users do 
    c.members.each do |m|
      json.set! m.id do
        json.extract! m, :id, :username, :discriminator, :online
        json.avatar url_for(m.avatar)
        json.servers m.server_aliases
      end
    end
  end

  # json.messages do
  #   c.messages.each do |m|
  #     json.set! m.id do
  #       json.extract! m, :id, :body
  #       json.author m.author_id
  #       json.textChannel false
  #       json.messageableId m.messageable_id
  #       json.createdAt m.created_at
  #       json.updatedAt m.updated_at
  #     end
  #   end
  # end
end