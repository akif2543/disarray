json.extract! user, :id, :username, :discriminator, :avatar
json.servers user.servers.map(&:id)
json.conversations []
json.friends []
json.pendingIn []
json.pendingOut []
json.blocked []