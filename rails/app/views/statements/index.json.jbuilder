json.array!(@statements) do |statement|
  json.extract! statement, :id, :room_id, :user_id, :full_text, :depth
  json.url statement_url(statement, format: :json)
end
