require('angular')
require('angular-ui-router')
require('angular-local-storage')
require('angular-jwt')
require('angular-translate')
require('ng-file-upload')
require('ng-tags-input')
require('angular-translate-loader-static-files')

//Change in production
//to http://musement.co and in development to http://localhost:8080
window.HOST='http://localhost:8080'

angular.module('musementApp',['ui.router', 'LocalStorageModule', 'angular-jwt','pascalprecht.translate', 'ngFileUpload', 'ngTagsInput'])//, 'ngFileUpload'
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
    .useSanitizeValueStrategy('escape') // Not completely vulnerable to serious attacks
    .registerAvailableLanguageKeys(['en', 'es'], langMap)
    .determinePreferredLanguage()
    .fallbackLanguage(['en']);
}])

.controller("mainCtrl", function($scope, $state, localStorageService, jwtHelper) {

  $scope.state = $state;

  //Decode token and asign info to user info div
  $scope.user = jwtHelper.decodeToken(localStorageService.get('token'))
})

.directive('confirmPwd', function($interpolate, $parse) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModelCtrl) {

      var pwdToMatch = $parse(attr.confirmPwd);
      var pwdFn = $interpolate(attr.confirmPwd)(scope);

      scope.$watch(pwdFn, function(newVal) {
          ngModelCtrl.$setValidity('password', ngModelCtrl.$viewValue == newVal)
      })

      ngModelCtrl.$validators.password = function(modelValue, viewValue) {
        var value = modelValue || viewValue;
        return value == pwdToMatch(scope);
      };

    }
  }
})

.directive('fileModel', ['$parse', function ($parse) {
return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel)
        var modelSetter = model.assign

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0])
            })
        })
    }
}
}])
