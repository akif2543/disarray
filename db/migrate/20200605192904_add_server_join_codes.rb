class AddServerJoinCodes < ActiveRecord::Migration[5.2]
  def change
    add_column :servers, :join_code, :integer, null: false, index: { unique: true }
  end
end
