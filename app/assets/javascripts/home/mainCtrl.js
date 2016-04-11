angular.module('oscarchavezBlog').controller('MainCtrl', [
'$scope',
'$location',
'posts',
function($scope, $location, posts){
	$scope.posts = posts.posts;
	$location.path();

	//Filter by category
	$scope.dev = true;
	$scope.vrar = true;
	$scope.blog = true;


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

	$scope.incrementUpvotes = function(post) {
	  posts.upvote(post);
	};

	$scope.uploadFile = function (file) {
		$scope.f = file;
		console.log(file);
		$scope.upload = Upload.upload({
			url: 'http://oscarchavez.me/js/upload.php',
			method: 'POST',
			data: {file: file}
		}).then(function(resp){
			console.log(resp);
			console.log('Response' + resp.data);
			$scope.alertMsg = resp.data;
			var today = new Date();
			var year = today.getFullYear();
			var filename = resp.config.data.file.name;
			$scope.imgUrl = "http://oscarchavez.me/uploads/" + year + "/" + filename;
		}, function(resp){
			console.log(resp);
			$scope.alertMsg = resp.status;
		}, function(evt){
			file.progress = Math.min(100, parseInt(100.0 * evt.loaded/evt.total));
		});
	};

}]);
