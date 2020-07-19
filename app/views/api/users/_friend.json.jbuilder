json.extract! user, :id, :username, :discriminator, :avatar, :online
json.servers user.server_aliases
json.conversations []
json.friends []
json.pendingIn []
json.pendingOut []
json.blocked []