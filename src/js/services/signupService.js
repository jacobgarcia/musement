angular.module('musementApp')
.service('signupDataService', function($http) {

  this.signup = function (signupInfo, callback) {
    $http.post(window.host + '/api/signup', signupInfo)
    .then(callback)
  }

});
