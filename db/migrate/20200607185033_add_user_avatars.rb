class AddUserAvatars < ActiveRecord::Migration[5.2]
  def change
    add_index :servers, :join_code, unique: true
    add_column :users, :avatar, :string, null: false
  end
end
