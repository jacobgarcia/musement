angular.module('musementApp')
.controller('projectCtrl', function($scope, $rootScope, $stateParams, projectDataService, localStorageService) {

  let username = $stateParams.username;
  let projectname = $stateParams.projectname;
  let user_id = localStorageService.get('user_id');

  projectDataService.getUsernameProject(username, projectname, function(response) {
    console.log("DATA",response.data);
    let project_id = response.data.project._id;
    projectDataService.getProject(project_id, function(response) {
      let project = response.data;
      $scope.project = project;
      projectDataService.getProjectMoments(project._id, function(response) {
        $scope.project.moments = response.data
      })
    })
  });

  $scope.submitProject = function (project) {

    let projectInfo = {};

    projectInfo.category = this.project.type;
    projectInfo.description = this.project.description;
    projectInfo.name = this.project.name;

    projectDataService.setProject(projectInfo, user_id, function (response) {
      if (response.data.success == true) {
        $scope.showCreateMoment()
        feedDataService.getInterestsFeed(user_id, function(response) { //Reload the moments
          $scope.interests.moments = response.data.moments;
        })
      } else {
        alert(response.error);
      }
    });
  };
})

.service('projectDataService', function($http) {

  this.setProject = function(project, user_id, callback) {
    $http.post(host + '/api/users/' + user_id + '/projects', project)
    .then(callback);
  }

  this.getProject = function (project_id, callback) {
    $http.get(host + '/api/projects/' + project_id)
    .then(callback)
  }

  this.getProjectMoments = function (project_id, callback) {
    $http.get(host + '/api/projects/' + project_id+'/moments')
    .then(callback)
  }

  this.getUsernameProject = function(username, project, callback) {
    $http.get(host + '/api/users/u=' + username + '/p=' + project)
    .then(callback)
  }

})
