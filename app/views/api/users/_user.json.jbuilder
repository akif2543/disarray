json.set! user.id do
  json.extract! user, :id, :username, :discriminator
  json.servers user.servers.map(&:id)
end