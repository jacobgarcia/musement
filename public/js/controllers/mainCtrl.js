angular.module('musementApp')
.controller('mainCtrl', function($scope, loginDataService, localStorageService, $state, AuthService) {

  console.log("State: ", $state.current.name, $state );
  console.log(AuthService.isAuthenticated());
  
  if (AuthService.isAuthenticated()) {
    console.log('You have a token, and it\'s valid, redirecting to index');
    $state.go('feed');
  }

});
