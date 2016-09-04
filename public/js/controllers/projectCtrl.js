angular.module('musementApp')
.controller('projectCtrl', function($scope, $rootScope, $stateParams, projectDataService) {

  let username = $stateParams.username;
  let projectname = $stateParams.projectname;

  projectDataService.getUsernameProject(username, projectname, function(response) {
    let project_id = response.data.project._id;
    console.log(project_id);
    projectDataService.getProject(project_id, function(response) {
      $scope.project = response.data;
    })
  });


})

.service('projectDataService', function($http) {

  this.getProject = function (project_id, callback) {
    $http.get(host + '/api/projects/' + project_id)
    .then(callback)
  }

  this.getUsernameProject = function(username, project, callback) {
    $http.get(host + '/api/users/u=' + username + '/p=' + project)
    .then(callback)
  }


});
