angular.module('musementApp')
.controller('mainCtrl', function($scope, loginDataService, invitationDataService, localStorageService, $state, AuthService, $translate) {

  $scope.segue = [{}];
  if (AuthService.isAuthenticated()) {
    $state.go('feed');
  }

  $scope.submit = function(guest){
    if (guest != null) {
      let invitationInfo = {};
      invitationInfo.email = this.guest;

      invitationDataService.invitation(invitationInfo, function(res){
        if (res.status == 201)
          $scope.message = $translate.instant('VALID_EMAIL');
      });
    }
    else
      $scope.message = $translate.instant('INVALID_EMAIL');
  }

});
