json.action "receive server"

json.server do
  json.set! @server.id do
    json.cache! @server, expires_in: 1.hour do
      json.partial! "api/servers/server", server: @server
    end
  end
end