angular
  .module('combiApp', [
    'ui.router','mainCtrl','authService','userCtrl','userService','dropService','dropCtrl','oneService','oneCtrl','mediaService','mediaCtrl','googleService','googleCtrl','megaService','megaCtrl','cloudService','cloudCtrl','logService','logCtrl'
  ])
  .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');
    $stateProvider
    .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'app/views/base.html'
    })
    .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'app/views/login.html',
          controller: 'MainController'
    })
    .state('register', {
          url: '/register',
          parent: 'base',
          templateUrl: 'app/views/register.html',
          controller: 'UserCreateController'
    })
    .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'app/views/dashboard.html',
          controller: 'MainController'
     })
     .state('overview', {
            url: '/overview',
            parent: 'dashboard',
            templateUrl: 'app/views/pages/home.html'
      })
     .state('chuss', {
          url: '/chuss',
          parent: 'dashboard',
          templateUrl: 'app/views/pages/chuss.html'
    })
    .state('dropbox', {
          url:'/dropbox',
          parent: 'dashboard',
          templateUrl: 'app/views/pages/drop.html'
    })
    .state('onedrive', {
          url:'/onedrive',
          parent: 'dashboard',
          templateUrl: 'app/views/pages/one.html'
    })
    .state('mediafire', {
          url:'/mediafire',
          parent: 'dashboard',
          templateUrl: 'app/views/pages/media.html'
    })
    .state('googledrive', {
          url:'/googledrive',
          parent: 'dashboard',
          templateUrl: 'app/views/pages/google.html'
    })
    .state('mega', {
          url:'/mega',
          parent: 'dashboard',
          templateUrl: 'app/views/pages/mega.html'
    })
    .state('cloud', {
          url:'/cloud',
          parent: 'dashboard',
          templateUrl: 'app/views/pages/cloud.html'
    })
    .state('log', {
          url:'/log',
          parent: 'dashboard',
          templateUrl: 'app/views/pages/log.html'
    })
    .state('settings', {
            url: '/settings',
            parent: 'dashboard',
            templateUrl: 'app/views/pages/settings.html'
      })
     .state('cloud_management', {
            url: '/cloudManagement',
            parent: 'dashboard',
            templateUrl: 'app/views/pages/cloudManagement.html'
      })
     .state('addcloud', {
            url: '/addCloud',
            parent: 'dashboard',
            templateUrl: 'app/views/pages/addcloud.html'
      })
     .state('removecloud', {
            url: '/removeCloud',
            parent: 'dashboard',
            templateUrl: 'app/views/pages/removecloud.html'
      })
     .state('mailbox', {
            url: '/mailbox',
            parent: 'dashboard',
            templateUrl: 'app/views/pages/mailbox.html'
      })
  }])

  .config(function($httpProvider){

  $httpProvider.interceptors.push('AuthInterceptor');
})