angular.module('musementApp')
.controller('feedCtrl', function($scope, $rootScope, $state, $stateParams, loginDataService) {
  $scope.bodyMove = function (state) {
    $scope.bodyMoved = !$scope.bodyMoved;
  }
  $scope.app = true;
  $scope.showNotifications = function () {
    $scope.notificationsSeen = !$scope.notificationsSeen;
  }
  $scope.showCreateMoment = function () {
    $scope.momentSeen = !$scope.momentSeen;
  }
  $scope.showMomentDetails = function () {
    $scope.momentDetailsSeen = !$scope.notificationsSeen;
  }

  $scope.signin = function (user, password) {

  }

})

.service('feedDataService', function($http) {

  // this.getMoments = function(login_info, callback) {
  //   $http.get('http://' + ipAddress + '/api/authenticate', login_info)
  //   .then(callback)
  // };

});
