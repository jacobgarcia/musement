var ipAddress = 'localhost:8080';

angular.module("musementApp",["ui.router", "LocalStorageModule", "angular-jwt"])

.factory('httpRequestInterceptor', function (localStorageService) {
  return {
    request: function (config) {
      config.headers['x-access-token'] = localStorageService.get('token'); //Set token for all requests in all controllers
      return config;
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
})

.controller("mainCtrl",function($scope, $state, localStorageService, jwtHelper) {

  $scope.state = $state;
  //Decode token and asign info to user info div
  $scope.user = jwtHelper.decodeToken(localStorageService.get('token'));

});
