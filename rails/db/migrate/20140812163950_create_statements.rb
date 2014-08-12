class CreateStatements < ActiveRecord::Migration
  def change
    create_table :statements do |t|
      t.integer :room_id
      t.integer :user_id
      t.text :full_text
      t.integer :depth

      t.timestamps
    end
  end
end
