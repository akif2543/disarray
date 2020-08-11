json.extract! c, :id, :name, :group 
json.icon(url_for(c.icon)) if c.group && c.icon.attached?
json.owner c.owner_id
json.members c.members.map(&:id)