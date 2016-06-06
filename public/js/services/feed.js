var ipAddress = 'localhost:8080';

angular.module('feedApp')

//Interceptor start
// .factory('httpRequestInterceptor', function (localStorageService) {
//   return {
//     request: function (config) {
//       //Set token to the headers of all requests
//       config.headers['x-access-token'] =  localStorageService.get('token');
//       return config;
//     }
//   };
// })
// .factory('httpResponseInterceptor', function ($q) {
//   return {
//         response: function (response) {
//             // do something on success
//             console.dir(response);
//             return response;
//         }
//     };
// })
// .config(function ($httpProvider) {
//   $httpProvider.interceptors.push('httpRequestInterceptor');
//   $httpProvider.interceptors.push('httpResponseInterceptor');
// })
//Interceptor end

.service('dataService', function($http) {

  this.getMoments = function(callback) {
    $http.get('http://' + ipAddress + '/api/moments')
    .then(callback)
  };


});
