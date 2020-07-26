json.action "receive member"
json.id @membership.member_id
json.server @membership.subscribeable_id

json.member do
  json.extract! user, :id, :username, :discriminator, :online
  json.avatar url_for(user.avatar)
  json.servers user.server_aliases
end