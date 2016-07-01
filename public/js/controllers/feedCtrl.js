angular.module('musementApp')
.controller('feedCtrl', function($scope, feedDataService, $state, AuthService) {

  $scope.bodyMove = function () {
    $scope.bodyMoved = !$scope.bodyMoved;
  }
})

.service('feedDataService', function($http) {

  // this.authenticate = function(login_info, callback) {
  //   $http.post('http://' + ipAddress + '/api/authenticate', login_info)
  //   .then(callback)
  // };

});
