angular.module('musementApp')
.controller('mainCtrl', function($scope, loginDataService, localStorageService, $state, AuthService) {
  
  //Check if user has a VALID token, redirect if not to landing page and suggest login
  if (AuthService.isAuthenticated()) {
    console.log('You have a token, and it\'s valid, redirecting to index');
    $state.go('index');
  }

  //Validate login and redirect
  $scope.submitForm = function(login_info) {
    loginDataService.authenticate(login_info, function(response) {
      //Set local storage var token for accessing everywhere
      // localStorageService.set('token', response.data.token);
      // localStorageService.set('token', 'pl4ceH0lD3rT0K3n');
      $scope.data = response.data; //Set data, it contains the server response message

      if (AuthService.isAuthenticated) { //If we recieved a VALID token go to index
        //INCOMPLETE IMPLEMENTATION
        console.log('Going index');
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
