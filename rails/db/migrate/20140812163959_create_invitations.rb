class CreateInvitations < ActiveRecord::Migration
  def change
    create_table :invitations do |t|
      t.integer :invited_user_id
      t.integer :inviting_user_id
      t.integer :room_id
      t.boolean :responded

      t.timestamps
    end
  end
end
