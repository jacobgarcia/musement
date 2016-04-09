'use strict';

angular.module('feedApp')
.controller('mainCtrl', function($scope, dataService) {

  dataService.getMoments(function(response) {
    console.log(response.data);
    $scope.moments = response.data;
  });

})
