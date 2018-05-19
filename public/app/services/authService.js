angular.module('authService',[])



.factory('Auth', function($http, $q, AuthToken){

  var authFactory = {};

  authFactory.login = function(username, password){

    console.log(username+password);

    return $http.post('/api/login',{
      username: username,
      password: password
    })
    .success(function(data){
      AuthToken.setToken(data.allu,data.token);
      return data;
    })
  }
  authFactory.logout = function(){
    AuthToken.setToken();
  }

  authFactory.isLoggedIn = function(){
    if(AuthToken.getToken()){
      return true;
    }
    else {
      return false;
    }
  }
  authFactory.getUser = function(){

    if(AuthToken.getToken()){
      return $http.get('/api/me');
    }else {
      return $q.reject({message: "User has no Token"});
    }
  }
  return authFactory;

})


.factory('AuthToken',function($window){
  var authTokenFactory = {};

  authTokenFactory.getToken = function(){
    return $window.localStorage.getItem('token');
  }

  authTokenFactory.setToken = function(username, token){
    if(token){
      $window.localStorage.setItem('token', token);
      $window.localStorage.setItem('allu', username);
      $window.localStorage.setItem('parentid1', 0);
    }else {
      $window.localStorage.removeItem('token');
      $window.localStorage.removeItem('allu');
      $window.localStorage.removeItem('parentid1');
      $window.localStorage.removeItem('cloudmega');
      $window.localStorage.removeItem('cloudonedrive');
      $window.localStorage.removeItem('cloudgoogledrive');
      $window.localStorage.removeItem('cloudmediafire');
      $window.localStorage.removeItem('clouddropbox');
    }
  }

  return authTokenFactory;
})



.factory('AuthInterceptor', function($q, $location, AuthToken){

  var interceptorFactory = {};

  interceptorFactory.request = function(config){

    var token = AuthToken.getToken();

    if(token)
    {
      config.headers['x-access-token'] = token;
    }

    return config;
  }

  interceptorFactory.responseError = function(response){
    if(response.status == 403){
      $location.path('/login');
    }

    return $q.reject(response);
  }

  return interceptorFactory;
});
