json.array!(@questions) do |question|
  json.extract! question, :id, :room_id, :parent_statement_id, :full_text, :user_id
  json.url question_url(question, format: :json)
end
