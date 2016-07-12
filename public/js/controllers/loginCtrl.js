angular.module('musementApp')
.controller('loginCtrl', function($scope, loginDataService, localStorageService, $state, jwtHelper) {

  console.log('Hello world!');

  $scope.login = function(user, pass) {

    var login_info = {};
    login_info.username = user;
    login_info.password = pass;

    loginDataService.authenticate(login_info, function(response) {
      //Set local storage var token for accessing everywhere

      if (response.data.success) {
        localStorageService.set('token', response.data.token); //Set the token for reuse in every request
        localStorageService.set('user_id', response.data._id); //Set the user_id in the localStorageService
        localStorageService.set('username', response.data.username); //Set the user_id in the localStorageService
        $state.go('feed'); //Go to feed state :)
      } else {
        alert(response.data.message)
      }

    });

  };
})

.service('loginDataService', function($http) {

  this.authenticate = function(login_info, callback) {
    $http.post('http://' + ipAddress + '/api/authenticate', login_info)
    .then(callback)
  };

});
