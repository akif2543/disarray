class CreateServers < ActiveRecord::Migration[5.2]
  def change
    create_table :servers do |t|
      t.string :name, null: false, index: true
      t.text :description, null: false
      t.integer :owner_id, null: false, index: true

      t.timestamps
    end
  end
end
