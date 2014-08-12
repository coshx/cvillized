class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :room_id
      t.integer :parent_statement_id
      t.text :full_text
      t.integer :user_id

      t.timestamps
    end
  end
end
