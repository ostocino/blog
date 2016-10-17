class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, 
         :omniauthable, :omniauth_providers => [:facebook]


	def self.find_for_facebook_oauth(access_token, signed_in_resource=nil)
		data = access_token.info
		user = User.where(:provider => access_token.provider, :uid => access_token.uid).first

		if user
			user
		else
			registered_user = User.where(:email => data.email).first
			if registered_user
				registered_user
			else
				user = User.create(
					name: access_token.extra.raw_info.name,
					provider: access_token.provider,
					email: data.email,
					uid: access_token.uid,
					image: data.image,
					password: Devise.friendly_token[0,20],
				)
			end
		end
	end
	
end
