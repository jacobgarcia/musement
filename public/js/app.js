var ipAddress = 'localhost';

angular.module('musementApp',['ui.router', 'LocalStorageModule', 'angular-jwt','pascalprecht.translate'])//, 'ngFileUpload'

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

.config(['$translateProvider', function ($translateProvider) {

  var fileNameConvention = {
    prefix: '/static/locales/locale-',
    suffix: '.json'
  };

  var langMap = {
    'en_AU': 'en',
    'en_CA': 'en',
    'en_NZ': 'en',
    'en_PH': 'en',
    'en_UK': 'en',
    'en_US': 'en',
    'es_ES': 'es',
    'es_MX': 'es'
  };

  $translateProvider
    .useStaticFilesLoader(fileNameConvention) //Load json dedicated files
    .registerAvailableLanguageKeys(['en', 'es'], langMap)
    .determinePreferredLanguage()
    .fallbackLanguage(['en']);
}])

.controller("mainCtrl", function($scope, $state, localStorageService, jwtHelper) {

  $scope.state = $state;
  //Decode token and asign info to user info div
  $scope.user = jwtHelper.decodeToken(localStorageService.get('token'));
  console.log("MAIN CTRL");
});
