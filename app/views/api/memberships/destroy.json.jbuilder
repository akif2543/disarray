json.action "remove member"
json.id @membership.member_id
json.server @membership.subscribeable_id
json.channels @server.channels.map(&:id)