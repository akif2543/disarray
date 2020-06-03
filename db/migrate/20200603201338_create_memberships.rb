class CreateMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :memberships do |t|
      t.integer :member_id, null: false, index: true
      t.references :subscribeable, polymorphic: true

      t.timestamps
    end
  end
end
