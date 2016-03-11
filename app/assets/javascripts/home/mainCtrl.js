angular.module('oscarchavezBlog').controller('MainCtrl', [
'$scope',
'$location',
'posts',
function($scope, $location, posts){
	$scope.posts = posts.posts;
	$location.path();
	
	$scope.addPost = function(){
	  if(!$scope.title || $scope.title === '') { return; }
	  posts.create({
	    title: $scope.title,
	    link: $scope.link,
	  });
	  $scope.title = '';
	  $scope.link = '';
	  $location.path('/home');
	};

	$scope.deletePost = function(post){
		console.log("post to destroy:",post);
		posts.destroy(post);
	}

	$scope.incrementUpvotes = function(post) {
	  posts.upvote(post);
	};

}])