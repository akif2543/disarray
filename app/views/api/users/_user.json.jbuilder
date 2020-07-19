json.set! user.id do
  json.extract! user, :id, :username, :discriminator, :avatar, :online
  json.servers user.server_aliases
  # json.servers user.servers.map(&:id)
  # conversations = []
  #   conversees = {}
  #   user.conversations.each do |c|
  #     conversations << c.id
  #     unless c.group
  #       u = c.members.find { |m| m.id != user.id}
  #       conversees[u.id] = c.id
  #     end
  #   end

  #   json.conversations conversations
  #   json.conversees conversees
  # json.friends []
  # json.pendingIn []
  # json.pendingOut []
  # json.blocked []
end