json.action @request

json.requester do
  json.partial! "api/users/friend", user: @user
end

json.requestee do
  json.partial! "api/users/friend", user: @current_user
end