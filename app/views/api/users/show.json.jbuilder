json.user do
  json.partial! "api/users/user", user: @user 
end

json.servers do
  @user.servers.each do |server|
    json.set! server.id do
      json.id server.id
      json.name server.name
      json.members []
      json.channels []
    end
  end
end