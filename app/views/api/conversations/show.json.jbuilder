json.conversation do
  json.set! @conversation.id do
    json.partial! "api/conversations/conversation", c: @conversation
    json.visited true
    json.messages @conversation.messages.map(&:id)
  end
end

json.messages do
  @conversation.messages.each do |m|
    json.partial! "api/messages/message", message: m
  end
end

json.users do
  @conversation.get_members.each do |m|
    json.cache! m do
      json.partial! "api/users/user", user: m
    end
  end
end