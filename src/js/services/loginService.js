angular.module('musementApp')
.service('loginDataService', function($http) {

  this.authenticate = function(login_info, callback) {
    $http.post(window.host + '/api/authenticate', login_info)
    .then(callback)
  };

});
