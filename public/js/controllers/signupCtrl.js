'user strict';
angular.module('musementApp')
.controller('signupCtrl', function($scope, signupDataService, localStorageService, $state) {
  $scope.signup = function () {
    console.log('Hey!');

    let signupInfo = {};
    signupInfo.username = this.username;
    signupInfo.email = this.email;
    signupInfo.password = this.password;

    console.log(signupInfo);

    signupDataService.signup(signupInfo, function (res) {
      if (res.data.success == true) {
        let data = res.data;
        //Set localStorage keys
        localStorageService.clearAll();
        localStorageService.set('token', data.token);
        localStorageService.set('username', data.username);
        localStorageService.set('user_id', data._id);

        $state.go('feed');
      } else {
        console.log(res.data);
        alert(res.data.message);
      }
    });

  }

})
.service('signupDataService', function($http) {

  this.signup = function (signupInfo, callback) {
    $http.post(host + '/api/signup', signupInfo)
    .then(callback)
  }

});
