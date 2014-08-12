class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :fb_api_user_id
      t.string :username

      t.timestamps
    end
  end
end
