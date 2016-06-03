angular.module('musementApp')
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
      .state("index", {
        url: "/",
        templateUrl: "static/views/index.html",
        controller: "mainCtrl",
        authenticate: false //Requires authentication?
      })
      .state("login", {
        url: "/login",
        templateUrl: "static/views/login.html",
        controller: "loginCtrl",
        authenticate: false //Requires authentication?
      })
    // Send to login if the URL was not found
    $urlRouterProvider.otherwise("/");

    // delete the # in the url
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

})
//Authentication service
.service('AuthService', function(localStorageService, $window) {
  //Functino to parse JWT and decode it
  self.parseJwt = function(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse($window.atob(base64));
  }

  this.isAuthenticated = function() {
    var token = localStorageService.get('token'); //Get token
    if(!token) { //If token == nil
      return false
    } else { //Check that the token is valid, time interval
      var params = self.parseJwt(token);
      return (Math.round(new Date().getTime() / 1000) <= params.exp);
    }
  };
})

//Run service to check the token is valid
.run(function ($rootScope, $state, AuthService) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate && !AuthService.isAuthenticated()){ // User isn’t authenticated
      $state.transitionTo("login"); //If it's not valid redirect to login
      event.preventDefault();
    }
  });
});
