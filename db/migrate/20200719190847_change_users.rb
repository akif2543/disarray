class ChangeUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :online, :boolean, null: false, default: false
  end
end
