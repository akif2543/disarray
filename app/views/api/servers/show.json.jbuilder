json.server do
  json.set! @server.id do
    json.name @server.name
    json.owner @server.owner_id
    json.members @server.members.map(&:id)
  end
end

json.users do
  @server.members.each do |member|
    json.partial! "api/users/user", user: member
  end
end