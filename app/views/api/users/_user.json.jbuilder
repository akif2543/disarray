json.set! user.id do
  json.extract! user, :id, :username, :discriminator, :avatar
  json.servers user.servers.map(&:id)
  json.conversations user.conversations.map(&:id)
  json.friends mutuals.nil? || mutuals.empty? ? [] : mutuals.map(&:id)
end