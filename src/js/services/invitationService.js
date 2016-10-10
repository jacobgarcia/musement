angular.module('musementApp')
.service('invitationDataService', function($http) {

  this.invitation = function (email, callback) {
    $http.post(window.host + '/api/invitation', email)
    .then(callback)
  }

});
