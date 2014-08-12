class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :fb_api_user_id
      t.string :username
      t.string :provider
      t.string :uid
      t.string :name
      t.string :oauth_token
      t.datetime :oauth_expires_at

      t.timestamps
    end
  end
end
