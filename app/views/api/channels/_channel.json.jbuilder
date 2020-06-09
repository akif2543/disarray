json.extract! channel, :id, :name, :topic
json.server channel.server_id
json.messages channel.messages.map(&:id)