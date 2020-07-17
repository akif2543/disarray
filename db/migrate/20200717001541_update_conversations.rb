class UpdateConversations < ActiveRecord::Migration[5.2]
  def change
    add_column :conversations, :group, :boolean, default: false
    add_column :conversations, :name, :string
    add_column :conversations, :icon, :string
    add_column :conversations, :owner_id, :integer, index: true
  end
end
