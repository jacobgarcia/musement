angular.module('musementApp')
.controller('feedCtrl', function($scope, $rootScope, $state, $stateParams, loginDataService, localStorageService, profileDataService, feedDataService, $compile, $sce, $window, Upload, $http, momentDataService) {

  let user_id = localStorageService.get('user_id')
  let detailCounter = 0

  $scope.app = true //UI attribute, important!
  $scope.interests = {}
  $scope.username = localStorageService.get('username')
  $scope.user_id = user_id
  $scope.tags = []
  $scope.proVisible = false
  $scope.welcomeVisible = false
  $scope.newMoment = {}
  $scope.newMoment.tags = []
  $scope.canSelectMore = $scope.newMoment.tags.length<4
  $rootScope.selected = 0

  this.username = localStorageService.get('username');

  // Load tags when creating a moment
  $scope.loadTags = function($query) {
    return $http.get(HOST + '/api/tags',{cache: true}).then(function(response) {
      var tags = response.data;
      return tags.filter(function(tag) {
        return tag.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
      })
    })
  }

  $scope.deleteMoment = function(moments, moment) {
    if(confirm("Are you sure you want to delte this moment?")){
      momentDataService.deleteMoment(moment._id, (res) => {
        if (res.status == 204) {
          moments.splice(moment.$index, 1)
        }
      }, (errRes) => console.log(errRes))
    }
  }

  $scope.showPro = function () {
    $scope.proVisible = !$scope.proVisible
  }

  $scope.showWelcome = function(){
    $scope.welcomeVisible = !$scope.welcomeVisible
    $scope.showPro();
  }

  $scope.tryPro = function () {
    feedDataService.setUserPro(user_id,
    function(res){
      $scope.proVisible = false
      $scope.welcomeVisible = false
      $scope.this_user.pro = true
    }, (errRes) => console.log(errRes) )
  }

  //Load the moments
  feedDataService.getInterestsFeed(user_id, function(response) {
    $scope.moments = response.data.moments;
  });

  $scope.showUserDetails = function (username) {
    var supperWrapper = angular.element(document.getElementById('supper-wrapper'));
    var content = $compile('<div class="moment-details" id="detail' + detailCounter +  '" ng-controller="userCtrl" ng-init="init(\'' + username + '\')" style="z-index: ' + (5 + detailCounter) + ' " ng-class="{\'active\': momentDetailsSeen}"><header><nav><ul class="menu"><li ng-click="removeDetail(\'detail' + detailCounter + '\')" id="menu"><</li><li class="title">{{user.username}}</li><li></li></ul></nav></header><main class="main-feed"><div class="user-profile"><div class="user-image"><img src="{{user.image}}" alt="" /></div><div class="user-info"><p class="name">{{user.name}} {{user.surname}}</p><p class="username">@{{user.username}}</p><p class="bio">{{user.bio}}</p><p class="location">{{user.location.city}}, {{user.location.state}}</p><p class="work not-available">Not available for work</p></div></div><div class="moment" ng-repeat="moment in user.moments" ng-click="showDetails(moment._id)" ng-model="moments"><div class="moment-text"><div class="user-image" ng-click="showUserDetails(moment.user.username); $event.stopPropagation();"><img src="{{user.image}}" alt="" /></div><div class="moment-info"><p class="user-name" ng-click="showUserDetails(moment.user.username); $event.stopPropagation();">{{moment.user.name}} {{moment.user.surname}}</p><p>{{moment.description}}</p><p class="question">{{moment.question}}</p></div></div><ul class="moment-tags tags" ng-if="!!moment.tags.length"><li ng-repeat="tag in moment.tags.name">{{tag}}</li></ul><div class="feedback-count"><p>{{moment.feedback.length}} feedbacks</p></div><div class="moment-stats"><div class="hearts" ng-click="heart($index, moment._id); $event.stopPropagation();" ng-class="{liked: ((moment.hearts | contains:user_id) || moment.liked)}"><p>{{moment.hearts.length}}</p></div><div class="feedback-icon"><p>Add feedback</p></div></div></div></main></div>')($scope);
    detailCounter++;
    supperWrapper.append(content);

  }

  //TODO: profileDataService.getConnectionsFeed(this.user_id, function())

  profileDataService.getProfileInfo(user_id, function(response) {
    let user = response.data.user
    $scope.this_user = user
  });

  $scope.submitMoment = function(moment){
      if (this.create_moment.description && this.create_moment.description.$valid){
        if (moment.tags){
            if (moment.tags.length <= 3){
              if (this.create_moment.files.$valid && this.newMoment && this.newMoment.files)
                  $scope.upload(moment, this.newMoment.files);
              else
                  $scope.setMoment(moment, null);
            }
        }
      else{
        if (this.create_moment.files.$valid && this.newMoment && this.newMoment.files)
            $scope.upload(moment, this.newMoment.files);
        else
            $scope.setMoment(moment, null);
      }
    }
  }

  $scope.upload = function(moment, file){
    Upload.upload({url: window.HOST + '/api/upload', data:{ file: file }})
    .then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){
                    $scope.setMoment(moment, '/static/uploads/' + resp.data.file_name);
                } else {
                    console.log('An error occured: ' + JSON.stringify(resp.data.error_desc));
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
    });
  }

  $scope.setMoment = function (moment, image) {
    let momentInfo = {}

    momentInfo.description = this.newMoment.description
    momentInfo.attachments =  image
    momentInfo.tags = this.newMoment.tags
    momentInfo.question = this.newMoment.question

    if (this.newMoment.project != null)
      momentInfo.project = this.newMoment.project._id
    else
      momentInfo.project = null;

    feedDataService.setMoment(momentInfo, user_id, function (response) {
      console.log('respospone at set moment',response)
      if (response.status == 201) {
        console.log('status 201')
        $scope.showCreateMoment() //Hide new moment
        //TODO: Maybe add a new animation when a moment has been created, in the midtime we will just reload the feed
        feedDataService.getInterestsFeed(user_id, function(response) { //Reload the moments
          $scope.moments = response.data.moments;
        })
      } else {
        alert(response.error);
      }
    })
  }

  $scope.logout = function () {
    localStorageService.clearAll();
    $state.go('landing');
  }

  $scope.setProject = function (project) {
    feedDataService.setProject(project, this.user_id, function (response) {
      console.log('Set project')
    })
  }

  $scope.heart = function (object) {
    if (object.moment.hearts.indexOf($scope.this_user._id) >= 0) {
      feedDataService.removeHeart(object.moment._id, function(res) {
        object.moment.hearts.splice(object.moment.hearts.indexOf($scope.this_user),1)
      }, (err) => console.log(err))
    } else {
      feedDataService.heartMoment(object.moment._id, function (res) {
        object.moment.hearts.push($scope.this_user._id)
      }, (err) => console.log(err))
    }
  }

  //UI functions:
  $scope.bodyMove = function (state) { $scope.bodyMoved = !$scope.bodyMoved; }
  $scope.showNotifications = function () { $scope.notificationsSeen = !$scope.notificationsSeen; }
  $scope.showCreateMoment = function () { $scope.momentSeen = !$scope.momentSeen; }
  $scope.showMomentDetails = function () { $scope.momentDetailsSeen = !$scope.notificationsSeen; }


})

// ******************************
//
//         MOMENT CTRL
//
// ******************************

.controller('userCtrl', function($scope, profileDataService) {

  $scope.init = function(username) {

    profileDataService.getProfileInfo('u=' + username, function(response) {
      if (response.data.success) {
        $scope.user = response.data.user;

        let user_id = response.data.user._id;
        profileDataService.getProfileMoments(user_id, function (response) {
          $scope.moments = response.data.moments;
        });

      } else {
        $scope.user = {};
        $state.go('feed.not-found'); //Go to feed state :)
      }

    });

  };

  $scope.removeDetail = function(element) {
    document.getElementById(element).remove()
  }
});
