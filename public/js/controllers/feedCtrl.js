angular.module('musementApp')
.controller('feedCtrl', function($scope, $rootScope, $state, $stateParams, loginDataService, localStorageService, profileDataService, feedDataService) {

  $scope.app = true;
  var username = localStorageService.get("username");

  profileDataService.getProfileInfo(username, function(response) {
    var user = response.data.user;
    $scope.thisUser = user;
  });

  $scope.bodyMove = function (state) {
    $scope.bodyMoved = !$scope.bodyMoved;
  }
  $scope.showNotifications = function () {
    $scope.notificationsSeen = !$scope.notificationsSeen;
  }
  $scope.showCreateMoment = function () {
    $scope.momentSeen = !$scope.momentSeen;
  }
  $scope.showMomentDetails = function () {
    $scope.momentDetailsSeen = !$scope.notificationsSeen;
  }
  $scope.setMoment = function (moment) {
    var user_id = $scope.thisUser._id;

    feedDataService.setMoment(moment, user_id, function (response) {
      console.log(response);
    });
  };

})
.service('feedDataService', function($http) {

  this.setMoment = function(moment, user_id, callback) {
    // console.log(host + '/api/' + user_id + '/moments');
    $http.post(host + '/api/users/' + user_id + '/moments', moment)
    .then(callback);
  }

  // this.getMoments = function(login_info, callback) {
  //   $http.get('http://' + ipAddress + '/api/authenticate', login_info)
  //   .then(callback)
  // };

});
