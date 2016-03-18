angular.module('oscarchavezBlog').factory('posts', ['$http', function($http){
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

	  return $http.post('/posts.json', post).success(function(data){
      o.posts.push(data);
      if(!data.link){
        data.link = '#/posts/' + data.id;
        //o.edit(data);
      };
	  });
	};

  o.edit = function(post){
    return $http.put('/posts.json' + post.id + '/edit.json').success(function(data){
      o.posts.push(data);
    });
  };


	o.upvote = function(post) {
	  return $http.put('/posts/' + post.id + '/upvote.json')
	    .success(function(data){
	      post.upvotes += 1;
	    });
	};

	o.get = function(id) {
	  return $http.get('/posts/' + id +'.json').then(function(res){
	    console.log("POST GET", res.data);
      return res.data;

	  });
	};

  o.edit = function(post){
    return $http.post('/posts.json', post).success(function(data){
      o.posts.push(data);
    });
  }

  o.destroy = function(post){
    return $http.delete('/posts/' + post.id).success(function(data){
      console.log("msg: ", data);
      //o.posts.splice(data, post);
    }).error(function(){
    });
  };

  //Comments CRUD

	o.addComment = function(id, comment) {
	  return $http.post('/posts/' + id + '/comments.json', comment);
	};

	o.upvoteComment = function(post, comment) {
  return $http.put('/posts/' + post.id + '/comments/'+ comment.id + '/upvote.json')
    .success(function(data){
      comment.upvotes += 1;
    });
	};

  return o;
}])
