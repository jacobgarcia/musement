angular.module('musementApp')
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
      .state("landing", {
        url: "/",
        controller: "mainCtrl",
        templateUrl: "/static/views/landingpage.html",
        authenticate: false //Doesn't requires authentication
      })
      .state("signup", {
        url: "/signup",
        controller: "signupCtrl",
        templateUrl: "/static/views/signup.html",
        authenticate: false //Doesn't requires authentication
      })
      .state("login", {
        url: "/login",
        controller: 'loginCtrl',
        templateUrl: "/static/views/login.html",
        authenticate: false
      })
      .state("feed", {
        url: "/",
        controller: "feedCtrl",
        templateUrl: "/static/views/feed.html",
        authenticate: true
      })
      .state("feed.inbox", {
        url: "inbox",
        controller: "inboxCtrl",
        templateUrl: "/static/views/inbox.html",
        authenticate: true
      })
      .state("feed.profile", {
        url: "user/:username/",
        controller: "profileCtrl",
        templateUrl: "/static/views/profile.html",
        authenticate: true
      })
      .state("feed.moment", {
        url: "user/:username/moments/:moment_id",
        controller: "momentCtrl",
        templateUrl: "/static/views/moment.html",
        authenticate: true
      })
      .state("feed.project", {
        url: "user/:username/:projectname/",
        controller: "projectCtrl",
        templateUrl: "/static/views/profile.project.html",
        authenticate: true
      })
      .state("feed.connections", {
        url: "connections/",
        templateUrl: "/static/views/feed.connections.html",
        authenticate: true
      })
      .state("feed.new-project", {
        url: "project/new",
        controller: "projectCtrl",
        templateUrl: "/static/views/feed.new-project.html",
        authenticate: true
      })

      .state("feed.not-found", {
        url: "not-found",
        templateUrl: "/static/views/feed.not-found.html",
        authenticate: true
      })


    // Send to landingpage if the URL was not found
    $urlRouterProvider.otherwise("not-found");

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
      if(!(Math.round(new Date().getTime() / 1000) <= params.exp)) {
        console.log('Invalid token');
      }
      return (Math.round(new Date().getTime() / 1000) <= params.exp);
    }
  };
})

//Run service to check the token is valid
.run(function ($rootScope, $state, AuthService) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate && !AuthService.isAuthenticated()){ // User isn’t authenticated
      $state.transitionTo("landing"); //If it's not valid redirect to login
      event.preventDefault();
    }
  });
});
