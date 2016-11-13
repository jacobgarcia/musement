angular.module('musementApp')
.service('invitationDataService', function($http) {

  this.invitation = function (invitationInfo, callback) {
    $http.post(window.HOST + '/api/invitation', invitationInfo)
    .then(callback)
  }

});
