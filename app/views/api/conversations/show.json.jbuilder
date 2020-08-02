json.conversation do
  json.set! @conversation.id do
    json.partial! "api/conversations/conversation", c: @conversation
    json.visited true
  end
end

json.messages do
  @conversation.messages.each do |m|
    json.partial! "api/messages/message", message: m
  end
end

json.users do
  json.cache_collection! @conversation.get_members, expires_in: 10.minutes do |m|
    json.partial! "api/users/user", user: m
  end
end