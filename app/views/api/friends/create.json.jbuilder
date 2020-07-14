# json.sent true

# json.requesterId @current_user.id

# json.user do
#   json.partial! "api/users/user"
# end

json.action "request"

json.requester do
  json.partial! "api/users/friend", user: @current_user
end

json.requestee do
  json.partial! "api/users/friend", user: @user
end


