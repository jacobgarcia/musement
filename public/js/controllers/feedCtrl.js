angular.module('musementApp')
.controller('feedCtrl', function($scope, $rootScope, $state, $stateParams, loginDataService, localStorageService, profileDataService, feedDataService) {

  $scope.app = true; //UI attribute, important!
  $scope.interests = {};
  this.username = localStorageService.get('username');
  $scope.username = localStorageService.get('username');
  let user_id = localStorageService.get('user_id');
  $scope.user_id = user_id;

  feedDataService.getInterestsFeed(user_id, function(response) {
    $scope.interests.moments = response.data.moments;
    console.log(response.data.moments);
  });

  //TODO: profileDataService.getConnectionsFeed(this.user_id, function())

  $scope.setMoment = function (moment) {
    feedDataService.setMoment(moment, user_id, function (response) {
      console.log(response);
    });
  };

  $scope.logout = function () {
    localStorageService.clearAll();
    $state.go('landing');
  }

  $scope.setProject = function (project) {
    feedDataService.setProject(project, this.user_id, function (response) {
      console.log(response);
    });
  };

  $scope.heart = function (index, moment_id) {
    console.log(index);
    feedDataService.heartMoment(moment_id, function (res) {
      if (res.data.success) {
        $scope.interests.moments[index].hearts.length++; //Increment counter if hearted succeed
        $scope.interests.moments[index].liked = true;
      } else {
        console.log(res.data);
      }
    });
  }
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

  this.heartMoment = function(moment_id, callback) {
    $http.post(host + '/api/moments/' + moment_id + '/likes/')
    .then(callback);
  }

  //TODO: Returns moments of the connections

})
.filter('contains', function() {
  return function (array, needle) {
    return array.indexOf(needle) >= 0;
  };
});
