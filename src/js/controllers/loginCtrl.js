angular.module('musementApp')
.controller('loginCtrl', function($scope, loginDataService, localStorageService, $state, jwtHelper) {
  $scope.next = true;

  $scope.login = function() {
    this.user.email = this.user.username
    loginDataService.authenticate(this.user,
    function(res) {
      localStorageService.clearAll()
      localStorageService.set('token', res.data.token) //Set the token for reuse in every request
      localStorageService.set('user_id', res.data._id) //Set the user_id in the localStorageService
      localStorageService.set('username', res.data.username) //Set the user_id in the localStorageService
      $state.go('feed')
    },
    function(res) { //error callback
      switch (res.status) {
        case 401:
          alert('Wrong user or password')
          break;
        case 400:
          alert('No user specified')
          break;
        default:
          alert('We have some troubles, please try again later')
      }
    })
  }
})
