angular.module('musementApp')
.controller('inboxCtrl', function($scope, profileDataService, localStorageService) {

  let user_id = localStorageService.get('user_id')

  profileDataService.getProfileInboxMoments(user_id, function (response) {
    console.log('moments',response.data.moments)
    $scope.moments = response.data.moments;
  })

})
