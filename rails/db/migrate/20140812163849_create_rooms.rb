class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :fb_comment_thread_id

      t.timestamps
    end
  end
end
