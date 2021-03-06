$(document).foundation();

var fb = new Firebase('https://angular-laundry.firebaseio.com');
var app = angular.module('app', [
  'ngLoadingSpinner',
  'firebase',
  'ui.router',
  'laundryControllers',
  'angularMoment'
]);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'views/home.html',
    controller: 'HomeController'
  })
  .state('laundryList', {
    url: '/jobs',
    templateUrl: 'views/laundry-list/list.html',
    controller: 'LaundryListCtrl'
  })
  .state('laundryJob', {
    url: '/jobs/:jobId',
    templateUrl: 'views/laundry-job/job.html',
    controller: 'LaundryJobCtrl'
  })
  .state('editJob', {
    url: '/jobs/:jobId/edit',
    templateUrl: 'views/laundry-job/edit.html',
    controller: 'LaundryJobEditCtrl'
  })
  .state('archives', {
    url: '/archives',
    templateUrl: 'views/archives/list.html',
    controller: 'LaundryArchiveCtrl'
  })
  .state('archivedJob', {
    url: '/archives/:archiveId',
    templateUrl: 'views/archives/archived_job.html',
    controller: 'LaundryArchivedJobCtrl'
  })
  .state('newJob', {
    url: '/new-job',
    templateUrl: 'views/laundry-job/new/new_job.html',
    controller: 'NewJobCtrl'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'views/user/profile.html',
    controller: 'UserProfileCtrl'
  });
}]);

app.factory('Auth', AuthService);
function AuthService($firebaseAuth) {
  return $firebaseAuth(fb);
}

app.controller('HomeController', function ($scope, $location, $http, $state, Auth) {
  $scope.siteName = 'Angular Laundry';
  $scope.version = '1.0';
  $scope.auth = Auth;
  $scope.loggedIn = false;
  $scope.auth.$onAuth(function(authData) {
    if (authData === null) {
    } else {
      $scope.authData = authData;
      $scope.currentUser = $scope.authData.facebook;
      $scope.loggedIn = true;
    }
  });

  $http.get("https://api.github.com/repos/noahdamiani/angular-laundry/commits").then(function(response) {
    $scope.commits = response.data.slice(0, 10);
  });

  $scope.login = function() {
    fb.authWithOAuthPopup("facebook", function(error, authData) {});
  };

  $scope.logout = function() {
    fb.unauth();
    window.localStorage.removeItem("firebase:session::angular-laundry");
    location.reload();
  };

  $scope.guestLogin = function() {
    $scope.loggedIn = true;
    $scope.currentUser = {
      displayName: "Guest User",
      profileImageURL: "http://placehold.it/30x30"
    }
    $state.reload();
  }
});
