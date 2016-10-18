angular.module('musementApp')
.controller('profileCtrl', function($scope, $rootScope,signupDataService, $stateParams, profileDataService, Upload, $state, $window) {

  var username = $stateParams.username;

  profileDataService.getProfileInfo('u=' + username, function(response) {
    if (response.data.success) {
      $scope.user = response.data.user;
      var user_id = response.data.user._id;

      profileDataService.getProfileMoments(user_id, function (res) {
        $scope.moments = res.data.moments;
      })

    } else {
      $scope.user = {};
      $state.go('feed.not-found'); //Go to feed state :)
    }
  });

  $scope.uploadAvatar = function(file){
        Upload.upload({
        url: window.HOST + '/api/users/' + $scope.user._id + '/avatar',
        data:{ file: file }
      }).then(function (res) { //upload function returns a promise
            $scope.user.image = res.data.path
        }, function (errRes) { //catch error
            $window.alert('Error status: ' + errRes.status);
      });
  }

})
