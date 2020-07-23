json.set! @user.id do
    json.extract! @user, :id, :username, :discriminator, :online
    json.avatar url_for(@user.avatar)
    json.servers @user.server_aliases
end