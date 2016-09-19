angular.module('musementApp')
.service('projectDataService', function($http) {

  this.setProject = function(project, user_id, callback) {
    $http.post(window.host + '/api/users/' + user_id + '/projects', project)
    .then(callback);
  }

  this.getProject = function (project_id, callback) {
    $http.get(window.host + '/api/projects/' + project_id)
    .then(callback)
  }

  this.getProjectMoments = function (project_id, callback) {
    $http.get(window.host + '/api/projects/' + project_id+'/moments')
    .then(callback)
  }

  this.getUsernameProject = function(username, project, callback) {
    $http.get(window.host + '/api/users/u=' + username + '/p=' + project)
    .then(callback)
  }

})
