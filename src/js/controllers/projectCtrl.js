angular.module('musementApp')
.controller('projectCtrl', function($scope, $rootScope, $stateParams, projectDataService, localStorageService, $http) {

  let username = $stateParams.username;
  let projectname = $stateParams.projectname;
  let user_id = localStorageService.get('user_id');

  $scope.members = []; //TODO: Optimize member retrieving

  // Load members when creating a project
  $scope.loadMembers = function($query) {
    return $http.get(host + '/api/members',{cache: true}).then(function(response) {
      var members = response.data;
      return members.filter(function(member) {
        return member.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
      });
    });
  };

  projectDataService.getUsernameProject(username, projectname, function(response) {
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
    projectInfo.members = this.project.members;
    projectInfo.color = "/static/img/project-colors/project_" + this.project.color + ".svg";

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
