json.set! @user.id do
  json.extract! @user, :id, :username, :discriminator, :online
  json.avatar url_for(@user.avatar)
  json.servers @user.mutual_server_aliases(@current_user)
  json.friends @user.mutual_friends(@current_user)
end