class AddServerJoinCode < ActiveRecord::Migration[5.2]
  def change
    remove_column :servers, :join_code
    add_column :servers, :join_code, :string, null: false, index: { unique: true }
  end
end
