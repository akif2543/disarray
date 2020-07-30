class UniqueMemberships < ActiveRecord::Migration[5.2]
  def change
    add_index :memberships, [:subscribeable_type, :subscribeable_id, :member_id], name: "index_memberships_on_subscribeable_and_member_id", unique: true
  end
end
