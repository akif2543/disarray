json.action "unfriend"

json.unfriender do
  json.partial! "api/users/friend", user: @current_user
end

json.unfriendee do
  json.partial! "api/users/friend", user: @user
end