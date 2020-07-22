class ChangeUserAvatars < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :avatar
  end
end
