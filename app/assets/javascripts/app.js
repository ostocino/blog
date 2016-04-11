angular.module('oscarchavezBlog', ['ui.router', 'templates', 'Devise', 'ngFileUpload', 'ngResource', 'hc.marked', 'angulike']).config([
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
    }).state('about', {
      url: '/about',
      templateUrl: 'about/_about.html',
      controller: 'MainCtrl'
    })
		.state('posts', {
		  url: '/posts/{id}',
		  templateUrl: 'posts/_posts.html',
		  controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
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
        url: '/posts/{id}/edit',
        templateUrl: 'posts/_edit.html',
        controller: 'PostsCtrl',
        resolve: {
          post: ['$stateParams', 'posts', function($stateParams, posts) {
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
}])

//Marked Provider, for directive 'marked'
.config(['markedProvider', function(markedProvider){
  markedProvider.setOptions({
    gfm: true,
    tables: true,
    highlight: function(code, lang){
      if(lang){
        return hljs.highlight(lang, code, true).value;
      } else{
        return hljs.highlightAuto(code).value;
      }
    }
  });
}]);
