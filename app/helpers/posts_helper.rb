module PostsHelper

def userIdToUsername(id)
	@user = User.find(id)
	username = @user.username
	username
end

end
