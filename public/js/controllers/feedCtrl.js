angular.module('musementApp')
.controller('feedCtrl', function($scope, $rootScope, $state, $stateParams, loginDataService, localStorageService, profileDataService, feedDataService, $compile, $sce) {

  $scope.app = true; //UI attribute, important!
  $scope.interests = {};
  this.username = localStorageService.get('username');
  $scope.username = localStorageService.get('username');
  let user_id = localStorageService.get('user_id');
  $scope.user_id = user_id;

  feedDataService.getInterestsFeed(user_id, function(response) {
    $scope.interests.moments = response.data.moments;
    // console.log(response.data.moments);
  });
  let detailCounter = 0;


  $scope.showDetails = function (moment_id) {

    var supperWrapper = angular.element(document.getElementById('supper-wrapper'));

    var content = $compile('<div class="moment-details" id="detail' + detailCounter +  '" ng-controller="momentCtrl" ng-init="init(\'' + moment_id + '\')" style="z-index: ' + (5 + detailCounter) + ' " ng-class="{\'active\': momentDetailsSeen}"><header><nav><ul class="menu"><li ng-click="removeDetail(\'detail' + detailCounter + '\')" id="menu"><</li><li class="title">Moment Details</li><li></li></ul></nav></header><main class="main-feed"><div class="moment"><div class="moment-text"><div class="user-image" ng-click="showUserDetails()"><img src="" alt=""/></div><div class="moment-info"><p class="user-name">{{moment.user.name}} {{moment.user.surname}}</p><p>{{moment.description}}</p><p class="question">{{moment.question}}</p></div></div><ul class="moment-tags tags"><li>iOS</li><li>Food</li><li>Design</li></ul></div><div class="feedback" ng-repeat="feedback in moment.feedback"><p><span class="username">@{{feedback.user.username}}</span>: {{feedback.text || feedback.comment}}</p></div></main><div class="comment"><input type="text" name="name" value=""><input type="button" name="name" value="Send"></div></div>')($scope);

    detailCounter++;

    supperWrapper.append(content);

  }

  //TODO: profileDataService.getConnectionsFeed(this.user_id, function())

  profileDataService.getProfileInfo(user_id, function(response) {
    let user = response.data.user;
    console.log(user);
    $scope.this_user = {};
    $scope.this_user.name = user.name;
    $scope.this_user.surname = user.surname;
  });

  $scope.setMoment = function (moment) {
    feedDataService.setMoment(moment, user_id, function (response) {
      console.log(response);
    });
  };

  $scope.logout = function () {
    localStorageService.clearAll();
    $state.go('landing');
  }

  $scope.setProject = function (project) {
    feedDataService.setProject(project, this.user_id, function (response) {
      console.log(response);
    });
  };

  $scope.heart = function (index, moment_id) {
    console.log(index);
    feedDataService.heartMoment(moment_id, function (res) {
      if (res.data.success) {
        $scope.interests.moments[index].hearts.length++; //Increment counter if hearted succeed
        $scope.interests.moments[index].liked = true;
      } else {
        console.log(res.data);
      }
    });
  }
  //UI functions:
  $scope.bodyMove = function (state) { $scope.bodyMoved = !$scope.bodyMoved; }
  $scope.showNotifications = function () { $scope.notificationsSeen = !$scope.notificationsSeen; }
  $scope.showCreateMoment = function () { $scope.momentSeen = !$scope.momentSeen; }
  $scope.showMomentDetails = function () { $scope.momentDetailsSeen = !$scope.notificationsSeen; }


})

.service('feedDataService', function($http) {

  //Creates a new moment to the user
  this.setMoment = function(moment, user_id, callback) {
    $http.post(host + '/api/users/' + user_id + '/moments', moment)
    .then(callback);
  }

  //Creates a new project to the user
  this.setProject = function(project, user_id, callback) {
    $http.post(host + '/api/users/' + user_id + '/projects', project)
    .then(callback);
  }

  //Returns moments of the interests
  this.getInterestsFeed = function(user_id, callback) {
    $http.get(host + '/api/users/' + user_id + '/interests/moments')
    .then(callback)
  }

  this.heartMoment = function(moment_id, callback) {
    $http.post(host + '/api/moments/' + moment_id + '/likes/')
    .then(callback);
  }

  //TODO: Returns moments of the connections

})
.filter('contains', function() {
  return function (array, needle) {
    return array.indexOf(needle) >= 0;
  };
})


// ******************************
//
//         MOMENT CTRL
//
// ******************************


.controller('momentCtrl', function($scope, momentDataService) {

  $scope.init = function(moment_id) {

    momentDataService.getMoment(moment_id, function(response) {
      console.log(response.data.moment);
      $scope.moment = response.data.moment;
    })

  };

  $scope.removeDetail = function(element) {
    console.log('removing element: ' + element);
    document.getElementById(element).remove()
  }
  // momentDataService.getMoment(this.)

})
.service('momentDataService', function($http) {
  this.getMoment = function(moment_id, callback) {
    $http.get(host + '/api/moments/' + moment_id)
    .then(callback)
  }
})
