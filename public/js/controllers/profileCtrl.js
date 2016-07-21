angular.module('musementApp')
.controller('profileCtrl', function($scope, $rootScope, $stateParams, profileDataService, $state) {

  var username = $stateParams.username;

  profileDataService.getProfileInfo(username, function(response) {
    if (response.data.success) {
      $scope.user = response.data.user;
      var user_id = response.data.user._id;

      profileDataService.getProfileMoments(user_id, function (response) {
        $scope.user.moments = response.data.moments;
      });

    } else {
      $scope.user = {};
      $state.go('feed.not-found'); //Go to feed state :)
    }
  });

})

.service('profileDataService', function($http) {

  this.getProfileInfo = function(user_id, callback) {
    $http.get(host + '/api/users/' + user_id )
    .then(callback);
  }

  this.getProfileMoments = function(user_id, callback) {
    $http.get(host + '/api/users/' + user_id + '/moments')
    .then(callback);
  }

});
