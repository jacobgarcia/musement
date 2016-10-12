angular.module('musementApp')
.controller('profileCtrl', function($scope, $rootScope, $stateParams, profileDataService, $state) {

  var username = $stateParams.username;

  profileDataService.getProfileInfo('u=' + username, function(response) {
    if (response.data.success) {
      $scope.user = response.data.user;
      var user_id = response.data.user._id;

      profileDataService.getProfileMoments(user_id, function (res) {
        $scope.user.moments = res.data.moments;
      })

    } else {
      $scope.user = {};
      $state.go('feed.not-found'); //Go to feed state :)
    }
  });

})
