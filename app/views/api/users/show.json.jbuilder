json.set! @user.id do
    json.extract! @user, :id, :username, :discriminator, :avatar, :online
    json.servers @user.servers.map(&:id)
    json.conversations @user.conversations.map(&:id)
    json.conversees {}
    json.friends @mutuals.map(&:id)
    json.pendingIn []
    json.pendingOut []
    json.blocked []
end

# json.servers do
#   @user.servers.each do |server|
#     json.set! server.id do
#       json.id server.id
#       json.name server.name
#       json.members [@user.id]
#       json.channels []
#     end
#   end
# end

# json.conversations do
#   @user.conversations.each do |c|
#     json.set! c.id do
#       json.id c.id
#       json.members [@user.id]
#       json.messages []
#     end
#   end
# end