
angular.module('oscarchavezBlog').controller('PostsCtrl', [
'$scope',
'posts',
'post',
function($scope, posts, post){
	$scope.post = post;
	$scope.postBody = post.body;
	console.log("post", $scope.post);

	$scope.postShare = {
		url: 'http://oscarchavez.me/' + $scope.post.link,
		name: $scope.post.title,
		imageUrl: $scope.post.image_url
	};

	$scope.addComment = function(){
	  if($scope.body === '') { return; }
	  posts.addComment(post.id, {
	    body: $scope.body,
	    author: 'user',
	  }).success(function(comment) {
	    $scope.post.comments.push(comment);
	  });
	  $scope.body = '';
	};

	$scope.deleteComment = function(comment){
		posts.destroyComment(post, comment);
	};

	$scope.incrementUpvotes = function(comment){
  	posts.upvoteComment(post, comment);
	};

	$scope.incrementPostUpvotes = function(post) {
	  posts.upvote(post);
	};

	$scope.deletePost = function(post){
		posts.destroy(post);
	}

	$scope.editPost = function(post){
		$scope.postToEdit = posts.get(post.id);
		console.log($scope.postToEdit);
	}

}])
