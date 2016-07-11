angular.module('musementApp')
.controller('profileCtrl', function($scope, $rootScope, $stateParams, profileDataService, localStorageService) {

  var user_id = localStorageService.get("user_id");

  profileDataService.getProfileInfo(user_id, function(response) {
    console.log(response);
    if (response.data.success) {
      $scope.user = response.data.user;
    } else {
      alert("Problem getting the user info.");
    }

  });

})

.service('profileDataService', function($http) {
  //
  // this.getProfileMoments = function(user_id, callback) {
  //   $http.post('http://' + ipAddress + '/api/users/' + user_id + '/moments')
  //   .then(callback)
  // };
  this.getProfileInfo = function(user_id, callback) {
    console.log(user_id);
    $http.get('http://' + ipAddress + '/api/users/' + user_id )
    .then(callback)
  }

});
