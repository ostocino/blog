class Post < ActiveRecord::Base

	extend FriendlyId

	friendly_id :title, use: :slugged
	
	has_many :comments
	belongs_to :user
  
  def as_json(options = {})
    super(options.merge(include: [:user, comments: {include: :user}]))
  end

  
end
