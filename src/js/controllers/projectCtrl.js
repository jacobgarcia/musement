angular.module('musementApp')
.filter('containsMember', function() {
  return function (array, needle) {
    for (var i = 0; i < array.length; i++) {
      if (array[i]._id == needle)
      return true
    }
    return false
  };
})
.controller('projectCtrl', function($scope, $rootScope, $stateParams, projectDataService, localStorageService, $http, Upload, $state) {

  let username = $stateParams.username;
  let projectname = $stateParams.projectname;
  let user_id = localStorageService.get('user_id');

  $scope.members = []; //TODO: Optimize member retrieving

  // Load members when creating a project
  $scope.loadMembers = function($query) {
    return $http.get(host + '/api/members/' + user_id, {cache: true}).then(function(response) {
      var members = response.data;
      return members.filter(function(member) {
        return member.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
      });
    });
  }

  projectDataService.getUsernameProject(username, projectname, function(response) {
    let project_id = response.data.project._id;
    projectDataService.getProject(project_id, function(response) {
      let project = response.data;
      $scope.project = project;
      projectDataService.getProjectMoments(project._id, function(response) {
        $scope.project.moments = response.data
      })
    })
  })

  $scope.uploadLogo = function(file) {
    Upload.upload({
           url: window.host + '/api/projects/' + $scope.project._id + '/logo',
           data: {file: file}
       }).then(function (response) {
           console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ' + response.data.path)
           $scope.project.logo = response.data.path
       }, function (response) {
           console.log('Error status: ' + response.status)
           console.dir(response)
       }, function (event) {
           var progressPercentage = parseInt(100.0 * event.loaded / event.total);
           console.log('progress: ' + progressPercentage + '% ' + event.config.data.file.name);
       });
  }

  $scope.submitProject = function (project) {

    let projectInfo = {};

    projectInfo.category = this.project.type
    projectInfo.description = this.project.description
    projectInfo.name = this.project.name
    //TODO: Get only the IDs
    projectInfo.members = this.project.members
    projectInfo.color = "/static/img/project-colors/project_" + this.project.color + ".svg"

    projectDataService.setProject(projectInfo, user_id, function (res) {
      if (res.status == 201) {

        $scope.this_user.projects.push(res.data.project)

        $state.go('feed.project', { 'username': $scope.this_user.username, 'projectname' : res.data.project.projectname })
      }
    }, function(res){
      alert(res.data.err.message);
    });
  };
})
