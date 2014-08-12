json.array!(@users) do |user|
  json.extract! user, :id, :fb_api_user_id, :username
  json.url user_url(user, format: :json)
end
