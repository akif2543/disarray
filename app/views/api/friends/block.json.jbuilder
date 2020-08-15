json.action @action

json.blocker do
  json.partial! "api/users/friend", user: @current_user
end

json.blockee do
  json.partial! "api/users/friend", user: @user
end