angular.module('musementApp')
.controller('projectCtrl', function($scope, $rootScope, $stateParams) {

  $scope.projectName = $stateParams.name;

});
