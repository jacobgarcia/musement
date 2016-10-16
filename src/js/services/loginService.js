angular.module('musementApp')
.service('loginDataService', function($http) {

  this.authenticate = function(login_info, callback, errorCallback) {
    $http.post(window.HOST + '/api/authenticate', login_info)
    .then(callback,errorCallback)
  };

});
