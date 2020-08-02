json.cache! [@user, @user.online], expires_in: 10.minutes do
    json.partial! "api/users/user", user: @user
end