angular.module('musementApp')
.controller('momentCtrl', function($scope, $compile, momentDataService, $stateParams) {

  let moment_id = $stateParams.moment_id;
  console.log(moment_id);
  $scope.setFeedback = function (feedback) {

    feedback.moment_id = $scope.moment._id;

    momentDataService.setFeedback(feedback, function(res) {
      if (res.data.success) {
        //Insert directly into html instead of making a new request
        var feedbackWrapper = angular.element(document.getElementById('feedback-wrapper'));
        var content = $compile('<div class="feedback"><p><span class="username" ng-click="showUserDetails(\''+ $scope.username +'\')">@'+ $scope.username +'</span>: ' + feedback.text + '</p></div>')($scope);
        feedbackWrapper.append(content);

        feedback.text = "";
      }
    });
  }

  momentDataService.getMoment(moment_id, function(response) {
    $scope.moment = response.data.moment;
    console.log(response.data.moment);
  })

})

.service('momentDataService', function($http) {
  this.getMoment = function(moment_id, callback) {
    $http.get(host + '/api/moments/' + moment_id)
    .then(callback)
  }

  this.setFeedback = function(feedback, callback) {
    console.log('Service feedback', feedback);
    $http.post(host + '/api/moments/' + feedback.moment_id + '/feedback', feedback)
    .then(callback)
  }
})
