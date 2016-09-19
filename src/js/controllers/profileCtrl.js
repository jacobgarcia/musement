angular.module('musementApp')
.controller('profileCtrl', function($scope, $rootScope, $stateParams, profileDataService, $state) {

  var username = $stateParams.username;

  profileDataService.getProfileInfo('u=' + username, function(response) {
    if (response.data.success) {
      console.log(response.data);
      $scope.user = response.data.user;
      var user_id = response.data.user._id;

      profileDataService.getProfileMoments(user_id, function (res) {
        console.log('Profile moments',res.data.moments);
        $scope.user.moments = res.data.moments;
      });

    } else {
      $scope.user = {};
      $state.go('feed.not-found'); //Go to feed state :)
    }
  });

})
