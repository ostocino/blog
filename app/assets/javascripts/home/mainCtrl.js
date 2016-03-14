angular.module('oscarchavezBlog').controller('MainCtrl', [
'$scope',
'$location',
'posts',
function($scope, $location, posts){
	$scope.posts = posts.posts;
	$location.path();
	
	$scope.addPost = function(){
	  if(!$scope.title || $scope.title === '' 
	  	||!$scope.body || $scope.body==='') { 
	  	return;
	  }
	  posts.create({
	    title: $scope.title,
	    link: $scope.link,
	    category: $scope.category,
	    body: $scope.body
	  });
	  $scope.title = '';
	  $scope.link = '';
	  $scope.body = '';
	  $scope.category = '';
	  $location.path('/home');
	};

	$scope.deletePost = function(post){
		console.log("Post to destroy:",post);
		posts.destroy(post);
	}

	$scope.editPost = function(post){
		$scope.postToEdit = posts.get(post.id);
		console.log($scope.postToEdit);
	}

	$scope.incrementUpvotes = function(post) {
	  posts.upvote(post);
	};

}])