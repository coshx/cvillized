# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140813035401) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "invitations", force: true do |t|
    t.integer  "invited_user_id"
    t.integer  "inviting_user_id"
    t.integer  "room_id"
    t.boolean  "responded"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "questions", force: true do |t|
    t.integer  "room_id"
    t.integer  "parent_statement_id"
    t.text     "full_text"
    t.integer  "questioned_user_id"
    t.integer  "depth"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "rooms", force: true do |t|
    t.string   "fb_comment_thread_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description"
  end

  create_table "statements", force: true do |t|
    t.integer  "room_id"
    t.integer  "user_id"
    t.text     "full_text"
    t.integer  "depth"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "fb_api_user_id"
    t.string   "username"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_admin",       default: false
  end

end
