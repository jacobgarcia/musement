angular.module('musementApp')
.service('momentDataService', function($http) {
  this.getMoment = function(moment_id, callback) {
    $http.get(window.host + '/api/moments/' + moment_id)
    .then(callback)
  }

  this.setFeedback = function(feedback, callback) {
    console.log('Service feedback', feedback);
    $http.post(window.host + '/api/moments/' + feedback.moment_id + '/feedback', feedback)
    .then(callback)
  }
})
