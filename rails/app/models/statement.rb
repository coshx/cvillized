class Statement < ActiveRecord::Base

  def self.full_text_search(query)
    if query.present?
      where("full_text @@ ?", query)
    else
      scoped
    end
  end
end
