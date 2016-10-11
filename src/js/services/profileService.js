angular.module('musementApp')
.service('profileDataService', function($http) {

  this.getProfileInfo = function(user_id, callback) {
    $http.get(window.host + '/api/users/' + user_id )
    .then(callback);
  }

  this.getProfileMoments = function(user_id, callback) {
    $http.get(window.host + '/api/users/' + user_id + '/moments')
    .then(callback);
  }

  this.getProfileInboxMoments = function(user_id, callback) {
    console.log('Getting inbox moments')
    $http.get(window.host + '/api/users/' + user_id + '/inbox/moments')
    .then(callback);
  }

})
