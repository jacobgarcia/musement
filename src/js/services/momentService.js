angular.module('musementApp')
.service('momentDataService', function($http) {
  this.getMoment = function(moment_id, callback) {
    $http.get(window.HOST + '/api/moments/' + moment_id)
    .then(callback)
  }

  this.setFeedback = function(feedback, callback) {
    $http.post(window.HOST + '/api/moments/' + feedback.moment_id + '/feedback', feedback)
    .then(callback)
  }

  this.getTags = function(callback, errCallback) {
    $http.get(window.HOST + '/api/tags')
    .then(callback, errCallback)
  }

  this.deleteMoment = function(moment_id ,callback, errCallback) {
    $http.delete(window.HOST + '/api/moments/' + moment_id)
    .then(callback, errCallback)
  }

})
