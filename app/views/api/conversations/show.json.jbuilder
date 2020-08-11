json.conversation do
  json.set! @conversation.id do
    json.cache! @conversation, expires_in: 10.minutes do
      json.partial! "api/conversations/conversation", c: @conversation
    end
    json.messages @conversation.messages.reverse.map(&:id)
    json.visited true
    json.unreads 0
  end
end

json.messages do
  @conversation.messages.each do |m|
    json.partial! "api/messages/message", message: m
  end
end

json.users do
  @conversation.members.each do |m|
    json.cache! m, expires_in: 10.minutes do
      json.partial! "api/users/user", user: m
    end
  end
end