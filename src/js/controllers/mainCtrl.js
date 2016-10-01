angular.module('musementApp')
.controller('mainCtrl', function($scope, loginDataService, localStorageService, $state, AuthService) {

  $scope.segue = [{}];
  if (AuthService.isAuthenticated()) {
    console.log('You have a token, and it\'s valid, redirecting to index');
    $state.go('feed');
  }

});
