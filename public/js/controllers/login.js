angular.module('musementApp')
.controller('loginCtrl', function($scope, loginDataService, localStorageService, $state) {

  $scope.user = {};

  //Remove token if it had one, works as a logout
  localStorageService.remove('token');

  $scope.submitForm = function(login_info) {
    loginDataService.authenticate(login_info, function(response) {

      //Set local storage var token for accessing everywhere
      localStorageService.set('token', response.data.token);
      $scope.data = response.data; //Set data, it contains the server response message

      if (response.data.token) { //If we recieved a token go to index
        $state.go('index');
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
