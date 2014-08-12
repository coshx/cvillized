json.array!(@rooms) do |room|
  json.extract! room, :id, :fb_comment_thread_id
  json.url room_url(room, format: :json)
end
