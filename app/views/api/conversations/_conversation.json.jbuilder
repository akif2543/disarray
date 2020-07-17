json.extract! c, :id, :name, :icon, :group 
json.owner c.owner_id
json.members c.members.map(&:id)
json.messages []