angular.module('musementApp')
.controller('feedCtrl', function($scope, $rootScope, $state, $stateParams, loginDataService, localStorageService, profileDataService, feedDataService) {

  $scope.app = true; //UI attribute, important!
  $scope.interests = {};
  var username = localStorageService.get("username");
  var user_id;

  profileDataService.getProfileInfo(username, function(response) {
    var user = response.data.user;
    $scope.thisUser = user;
    this.user_id = response.data.user._id;

    feedDataService.getInterestsFeed(this.user_id, function(response) {
      $scope.interests.moments = response.data.moments;
    });

  });

  //TODO: profileDataService.getConnectionsFeed(this.user_id, function())

  $scope.setMoment = function (moment) {
    feedDataService.setMoment(moment, this.user_id, function (response) {
      console.log(response);
    });
  };

  $scope.setProject = function (project) {
    feedDataService.setProject(project, this.user_id, function (response) {
      console.log(response);
    });
  };

  //UI functions:
  $scope.bodyMove = function (state) { $scope.bodyMoved = !$scope.bodyMoved; }
  $scope.showNotifications = function () { $scope.notificationsSeen = !$scope.notificationsSeen; }
  $scope.showCreateMoment = function () { $scope.momentSeen = !$scope.momentSeen; }
  $scope.showMomentDetails = function () { $scope.momentDetailsSeen = !$scope.notificationsSeen; }

})
.service('feedDataService', function($http) {

  //Creates a new moment to the user
  this.setMoment = function(moment, user_id, callback) {
    $http.post(host + '/api/users/' + user_id + '/moments', moment)
    .then(callback);
  }

  //Creates a new project to the user
  this.setProject = function(project, user_id, callback) {
    $http.post(host + '/api/users/' + user_id + '/projects', project)
    .then(callback);
  }

  //Returns moments of the interests
  this.getInterestsFeed = function(user_id, callback) {
    $http.get(host + '/api/users/' + user_id + '/interests/moments')
    .then(callback)
  }

  //TODO: Returns moments of the connections

});
