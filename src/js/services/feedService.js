angular.module('musementApp')
.service('feedDataService', function($http) {
  //Creates a new moment to the user
  this.setMoment = function(moment, user_id, callback) {
    $http.post(window.HOST + '/api/users/' + user_id + '/moments', moment)
    .then(callback);
  }

  //Creates a new project to the user
  this.setProject = function(project, user_id, callback) {
    $http.post(window.HOST + '/api/users/' + user_id + '/projects', project)
    .then(callback);
  }

  //Returns moments of the interests
  this.getInterestsFeed = function(user_id, callback) {
    $http.get(window.HOST + '/api/users/' + user_id + '/interests/moments')
    .then(callback)
  }

  this.setUserPro = function(user_id, callback, errCallback) {
    $http.post(window.HOST + '/api/users/' + user_id + '/pro')
    .then(callback, errCallback)
  }

  this.heartMoment = function(moment_id, callback,errCallback) {
    $http.post(window.HOST + '/api/moments/' + moment_id + '/likes')
    .then(callback, errCallback)
  }

  this.removeHeart = function(moment_id, callback, errCallback) {
    $http.delete(window.HOST +'/api/moments/' + moment_id + '/likes')
    .then(callback, errCallback)
  }

  //TODO: Returns moments of the connections

})
.filter('contains', function() {
  return function (array, needle) {
    return array.indexOf(needle) >= 0;
  };
})
