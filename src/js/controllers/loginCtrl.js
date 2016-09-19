angular.module('musementApp')
.controller('loginCtrl', function($scope, loginDataService, localStorageService, $state, jwtHelper) {

  console.log('Hello world!');
  $scope.next = true;

  $scope.login = function(user, password) {

    var loginInfo = {};
    loginInfo.username = user.toLowerCase();
    loginInfo.email = user.toLowerCase(); //IMPORTANT!
    loginInfo.password = password;

    loginDataService.authenticate(loginInfo, function(res) {
      //Set local storage var token for accessing everywhere
      let data = res.data;

      if (data.success) {
        localStorageService.clearAll();
        localStorageService.set('token', data.token); //Set the token for reuse in every request
        localStorageService.set('user_id', data._id); //Set the user_id in the localStorageService
        localStorageService.set('username', data.username); //Set the user_id in the localStorageService
        $state.go('feed'); //Go to feed state :)
      } else {
        alert(data.message);
      }

    });

  };

})
