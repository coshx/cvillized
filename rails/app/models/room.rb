class Room < ActiveRecord::Base
  has_many :invitations
end
