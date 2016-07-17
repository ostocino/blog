angular.module('oscarchavezBlog', ['ui.router', 'templates', 'Devise', 'ngFileUpload', 'ngResource', 'hc.marked', 'angulike', 'ui.router.metatags'])

.config(['$stateProvider','$urlRouterProvider','UIRouterMetatagsProvider',
  function($stateProvider, $urlRouterProvider, UIRouterMetatagsProvider) {

    //State Provider
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
      },
      metaTags: {
        title: 'oscarchavez.me',
        description: 'Blog | oscarchavez.me',
        keywords: 'oscar, chavez, oscarchavez, vr, ar, mxvr, entrepreneur, mexico, virtual reality, augmented reality',
        properties: {
          'og:title': 'oscarchavez blog'
        }
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
          console.log(posts.get($stateParams.id));
          return posts.get($stateParams.id);
        }]
      },
      metaTags: {
        /*title: post.title,
        description: post.excerpt,
        properties: {
          'og:title' : post.title,
          'og:description' : post.description,
          'og:image' : post.image,
        }*/
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
      }],
      metaTags: {
        title: 'Login | oscarchavez.me',
        description: 'Login for contributors and admin'
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }],
      metaTags: {
        title: 'Register | oscarchavez.me',
        description: 'Register a new user, for contributors and admin'
      }
    });

    //UrlRouteProvider
    $urlRouterProvider.otherwise('home');

    //MetaTags Provider
    UIRouterMetatagsProvider
    .setTitlePrefix('oscarchavez -  ')
    .setTitleSuffix(' | oscarchavez')
    .setDefaultTitle('oscarchavez | angular, rails, unity, vr-ar, entreprenurship | @ostocino')
    .setDefaultDescription('fullstack development, graphics and virtual reality, entreprenurship, personal blog of oscarchavez. @ostocino')
    .setDefaultKeywords('ullstack, rails, ruby, angular, bootstrap, vr, ar, development, programming, entrepreneurship, traveling, virtual reality, augmented reality, computer graphics')
    .setStaticProperties({
        'og:site_name' : 'oscarchavez.me',
      })
    .setOGURL(true);

  }])


.run(['$rootScope', 'MetaTags', 
  function ($rootScope, MetaTags){

    $rootScope.MetaTags = MetaTags;

}]);


