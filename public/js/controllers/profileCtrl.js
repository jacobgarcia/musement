angular.module('musementApp')
.controller('profileCtrl', function($scope, $rootScope, $stateParams, profileDataService, $state) {

  var username = $stateParams.username;

  profileDataService.getProfileInfo('u=' + username, function(response) {
    if (response.data.success) {
      console.log(response.data);
      $scope.user = response.data.user;
      var user_id = response.data.user._id;

      profileDataService.getProfileMoments(user_id, function (response) {
        console.log('Profile moments');
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
