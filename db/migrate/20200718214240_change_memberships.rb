class ChangeMemberships < ActiveRecord::Migration[5.2]
  def change
    add_column :memberships, :alias, :string
  end
end
