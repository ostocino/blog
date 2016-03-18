angular.module('oscarchavezBlog', ['ui.router', 'templates', 'Devise', 'ngFileUpload']).config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts',
          function(posts){
            return posts.getAll();
        }]
		  }
    })
		.state('posts', {
		  url: '/posts/{id}',
		  templateUrl: 'posts/_posts.html',
		  controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          console.log(posts);
          return posts.get($stateParams.id);
        }]
      }
    })
    .state('new', {
      url: '/new',
      templateUrl: 'posts/_new.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts',
          function(posts){
            return posts.getAll();
        }]
      }
    })
    .state('edit', {
        url: '/edit/{id}',
        templateUrl: 'posts/_edit.html',
        controller: 'MainCtrl',
        resolve: {
          post: ['$stateParams', 'posts', function($stateParams, posts) {
            console.log(posts.get($stateParams.id));
            return posts.get($stateParams.id);
          }]
        }
      })
    .state('login', {
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    })
    .state('register', {
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    });

  $urlRouterProvider.otherwise('home');
}]);
