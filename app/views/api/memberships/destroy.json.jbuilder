json.action "remove member"
json.id @membership.member_id
if @server
  json.server @server.id
  json.channels @server.channels.map(&:id)
else
  json.conversation @conversation.id
end