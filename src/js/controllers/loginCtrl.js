angular.module('musementApp')
.controller('loginCtrl', function($scope, loginDataService, localStorageService, $state, jwtHelper) {

  $scope.next = true;
  $scope.login = function(user, password) {
    console.log(user, password);
    var loginInfo = {};
    loginInfo.username = user.toLowerCase();
    loginInfo.email = user.toLowerCase(); //IMPORTANT!
    loginInfo.password = password;

    loginDataService.authenticate(loginInfo, function(res) {
      //Set local storage var token for accessing everywhere
      let data = res.data
      switch (res.status) {
        case 200:
          localStorageService.clearAll();
          localStorageService.set('token', data.token) //Set the token for reuse in every request
          localStorageService.set('user_id', data._id) //Set the user_id in the localStorageService
          localStorageService.set('username', data.username) //Set the user_id in the localStorageService
          $state.go('feed'); //Go to feed state :)
          break;
        default:
          lert(data.message);
          break;
      }
    })
  }
})
