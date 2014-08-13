class Room < ActiveRecord::Base
  has_many :invitations
  
  def self.description_text_search(query)
    if query.present?
      where("description @@ ?", query)
    else
      scoped
    end
  end
  
end
