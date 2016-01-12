$(document).foundation();

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
      });
}]);

app.factory('Auth', AuthService);
function AuthService($firebaseAuth) {
  var ref = new Firebase("https://angular-laundry.firebaseio.com");
  return $firebaseAuth(ref);
}

app.controller('HomeController', function ($scope, $location, $firebaseAuth, $http, Auth) {
  var fb = new Firebase('https://angular-laundry.firebaseio.com');
  $scope.siteName = 'Angular Laundry';
  $scope.version = '1.0';
  $scope.auth = Auth;
  $scope.loggedIn = false;

  $scope.auth.$onAuth(function(authData) {
    if (authData === null) {
    } else {
      $scope.authData = authData;
      var name = $scope.authData.facebook.displayName;
      $scope.fullName = name;
      $scope.firstName = name.split(' ').slice(0, -1).join(' ');
      $scope.avatar = $scope.authData.facebook.profileImageURL;
      $scope.loggedIn = true;
    }
  });

  $http.get("https://api.github.com/repos/noahdamiani/angular-laundry/commits").then(function(response) {
      $scope.commits = response.data.slice(0, 15);
  });

  $scope.login = function() {
    fb.authWithOAuthPopup("facebook", function(error, authData) {});
  };

  $scope.logout = function() {
    fb.unauth();
    window.localStorage.removeItem("firebase:session::angular-laundry");
    location.reload();
  };
});

// FILTERS
app.filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});
