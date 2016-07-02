angular.module('musementApp')
.controller('feedCtrl', function($scope, $rootScope, $state, $stateParams) {

  $scope.bodyMove = function (state) {
    $scope.bodyMoved = !$scope.bodyMoved;
  }
  $scope.app = true;
  $scope.showNotifications = function () {
    $scope.notificationsSeen = !$scope.notificationsSeen;
  }

})

.service('feedDataService', function($http) {

  // this.authenticate = function(login_info, callback) {
  //   $http.post('http://' + ipAddress + '/api/authenticate', login_info)
  //   .then(callback)
  // };

});
