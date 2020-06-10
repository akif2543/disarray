json.user do
  json.partial! "api/users/user", user: @user 
end

json.servers do
  @user.servers.each do |server|
    json.set! server.id do
      json.id server.id
      json.name server.name
      json.members [@user.id]
      json.channels []
    end
  end
end

json.conversations do
  @user.conversations.each do |c|
    json.set! c.id do
      json.id c.id
      json.members [@user.id]
      json.messages []
    end
  end
end