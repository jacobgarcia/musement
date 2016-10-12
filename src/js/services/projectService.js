angular.module('musementApp')
.service('projectDataService', function($http) {

  this.setProject = function(project, user_id, callback, errCallback) {
    $http.post(window.HOST + '/api/users/' + user_id + '/projects', project)
    .then(callback, errCallback);
  }

  this.getProject = function (project_id, callback) {
    $http.get(window.HOST + '/api/projects/' + project_id)
    .then(callback)
  }

  this.getProjectMoments = function (project_id, callback) {
    $http.get(window.HOST + '/api/projects/' + project_id+'/moments')
    .then(callback)
  }

  this.getUsernameProject = function(username, project, callback) {
    $http.get(window.HOST + '/api/users/u=' + username + '/p=' + project)
    .then(callback)
  }

})
