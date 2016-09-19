angular.module('musementApp')
.directive('moment',function(){
  return {
    templateUrl: '/static/views/templates/moment.html',
    replace: true
  }
})
