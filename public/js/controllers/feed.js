'use strict';

angular.module('musementApp')
.controller('mainCtrl', function($scope, mainDataService) {

  mainDataService.getMoments(function(response) {
    console.log(response.data);
    $scope.moments = response.data;
  });

})

.service('mainDataService', function($http) {

  this.getMoments = function(callback) {
    console.log('Getting moments');
    $http.get('http://' + ipAddress + '/api/users/56e0b216f00e6b7f0ddaf09c/moments')
    .then(callback)
  };

});
