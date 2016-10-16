angular.module('musementApp')
.service('invitationDataService', function($http) {

  this.invitation = function (email, callback) {
    $http.post(window.HOST + '/api/invitation', email)
    .then(callback)
  }

});
