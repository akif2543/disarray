json.extract! user, :id, :username, :discriminator, :online
json.avatar url_for(user.avatar)
json.servers user.server_aliases