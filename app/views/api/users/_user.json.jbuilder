json.set! user.id do
  json.extract! user, :id, :username, :discriminator
end