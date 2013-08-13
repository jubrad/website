class User < ActiveRecord::Base
	# attr_accessor :password
#may want to do password confirmation
	# validates_presence_of :password
	# validates_presence_of :user_name
	# validates_uniqueness_of :user_name

	def self.authenticate(user_name,password)
		user= find_by_user_name(user_name)
		if user && user.password==password
			user
		else
			nil
		end
	end
	#if more security is needed
	#bcrypt hasing can be used
	#guide 
	#http://railscasts.com/episodes/250-authentication-from-scratch
end
