angular.module('musementApp')
.controller('projectCtrl', function($scope, $rootScope, $stateParams, projectDataService, localStorageService) {

  let username = $stateParams.username;
  let projectname = $stateParams.projectname;
  let user_id = localStorageService.get('user_id');

  /*projectDataService.getUsernameProject(username, projectname, function(response) {
    let project_id = response.data.project._id;
    console.log(project_id);
    projectDataService.getProject(project_id, function(response) {
      $scope.project = response.data;
    })
  });*/

  $scope.submitProject = function (project) {

    let projectInfo = {};

    projectInfo.category = this.project.type;
    projectInfo.description = this.project.description;
    projectInfo.name = this.project.name;

    console.log(projectInfo);
    projectDataService.setProject(projectInfo, user_id, function (response) {
      console.log(response.data);
      if (response.data.success == true) {
        //$scope.showCreateMoment(); //Hide new moment
        //feedDataService.getInterestsFeed(user_id, function(response) { //Reload the moments
        //  $scope.interests.moments = response.data.moments;
        //});
      } else {
        alert(response.error);
      }
    });
  };
})

.service('projectDataService', function($http) {

  //Creates a new project to the user
  this.setProject = function(project, user_id, callback) {
    $http.post(host + '/api/users/' + user_id + '/projects', project)
    .then(callback);
  }

  /*this.getProject = function (project_id, callback) {
    $http.get(host + '/api/projects/' + project_id)
    .then(callback)
  }

  this.getUsernameProject = function(username, project, callback) {
    $http.get(host + '/api/users/u=' + username + '/p=' + project)
    .then(callback)
  }*/


});
