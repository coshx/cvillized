json.array!(@invitations) do |invitation|
  json.extract! invitation, :id, :invited_user_id, :inviting_user_id, :room_id, :responded
  json.url invitation_url(invitation, format: :json)
end
