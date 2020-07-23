class UpdateConversationsIcon < ActiveRecord::Migration[5.2]
  def change
    remove_column :conversations, :icon
    change_column :conversations, :owner_id, :integer, null: false, index: true
  end
end
