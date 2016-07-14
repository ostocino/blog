angular.module('oscarchavezBlog').factory('posts', ['$http', '$resource', function($http, $resource){

  var postcrud = $resource("/posts/:id", {id: "@id"}, {update: {method: "PUT"}});

  var o = {
    posts: [
    ]
  };

  //Posts CRUD

  o.getAll = function() {
  		return $http.get('/posts.json').success(function(data){
      	angular.copy(data, o.posts);
    });
  };

	o.create = function(post) {
    console.log("POST TO CREATE:", post);
	  return $http.post('/posts.json', post).success(function(data){
      o.posts.push(data);
	  });
	};

  o.edit = function(post){
    return $http.get('/posts/' + post.id + '/edit.json').success(function(data){
      o.posts.push(data);
    });
  };

  o.update = function(post){
    console.log("UPDATE", post);
    postcrud.update(post);
  };


	o.upvote = function(post) {
	  return $http.put('/posts/' + post.id + '/upvote.json').success(function(data){
	      post.upvotes += 1;
	    });
	};

	o.get = function(id) {
	  return $http.get('/posts/' + id +'.json').then(function(res){
      return res.data;
	  });
	};

  o.delete = function(post){
    return $http.delete('/posts/' + post.id).success(function(data){
      console.log("msg: ", data);
      o.posts.splice(data, post);
    }).error(function(){
      console.log("Error destroying post");
    });
  };

  //Comments CRUD

	o.addComment = function(id, comment) {
    comment.upvote = 0;
	  return $http.post('/posts/' + id + '/comments.json', comment);
	};

  o.deleteComment = function(post, comment){
    return $http.delete('/posts/' + post.id +'/comments/' + comment.id).success(function(data){
      console.log("msg:", data);
      o.posts.comments.splice(data, comment);
    }).error(function(){
      console.log("Error destroying post comment");
    });
  };

	o.upvoteComment = function(post, comment) {
  return $http.put('/posts/' + post.id + '/comments/'+ comment.id + '/upvote.json')
    .success(function(data){
      comment.upvotes += 1;
    });
	};

  return o;
}])
