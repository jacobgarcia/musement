angular.module('musementApp')
.controller('mainCtrl', function($scope, loginDataService, localStorageService, $state, AuthService) {

  $scope.segue = [{}];
  if (AuthService.isAuthenticated()) {
    $state.go('feed');
  }

});
