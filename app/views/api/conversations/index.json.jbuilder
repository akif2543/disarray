@conversations.each do |c|
  json.conversations do
    json.set! c.id do
      json.partial! "api/conversations/conversation", c: c
    end
  end

  json.users do 
    c.members.each do |m|
     json.partial! "api/users/user", user: m
    end
  end
end