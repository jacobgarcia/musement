'use strict';

angular.module('feedApp')
.controller('mainCtrl', function($scope, dataService) {

  dataService.getMoments(function(response) {
    $scope.moments = response.data;
  });

})
