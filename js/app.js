$(document).foundation();

var app = angular.module('app', [
  'ngLoadingSpinner',
  'firebase',
  'ui.router',
  'laundryControllers',
  'angularMoment'
  ]);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/jobs');
    $stateProvider
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
      .state('archives', {
        url: '/archives',
        templateUrl: 'views/archives/list.html',
        controller: 'LaundryArchiveCtrl'
      })
      .state('archivedJob', {
        url: '/archives/:archiveId',
        templateUrl: 'views/archivs/archived_job.html',
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

app.controller('HomeController', function ($scope, $location, $firebaseAuth, Auth) {
  var fb = new Firebase('https://angular-laundry.firebaseio.com');
  $scope.siteName = 'Angular Laundry';
  $scope.version = '1.0';
  $scope.auth = Auth;

  $scope.auth.$onAuth(function(authData) {
    if (authData === null) {
      $('.logout').hide();
    } else {
      $('.logout').show();
      $scope.authData = authData;
      var name = $scope.authData.facebook.displayName;
      $scope.fullName = name;
      $scope.firstName = name.split(' ').slice(0, -1).join(' ');
      $scope.avatar = $scope.authData.facebook.profileImageURL;
    }
  });

  $scope.login = function() {
    fb.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        // Error Handling
      } else {
        // Success
      }
    });
  };

  $scope.logout = function() {
    fb.unauth();
    window.localStorage.removeItem("firebase:session::angular-laundry");
    location.reload();
  };
});

app.controller('NewJobCtrl', function ($scope, $firebaseArray, $location) {
  var fb = new Firebase("https://angular-laundry.firebaseio.com/jobs");
  $scope.jobs = $firebaseArray(fb);
  
  $scope.addJob = function() {
    var date = new Date();
    var type = $scope.type;

    $scope.jobs.$add({
      name: $scope.firstName,
      phone: $scope.phone,
      createdAt: date.toString(),
      type: type.toString(),
      status: {
        details: 'not started',
        done: false
      }
    });

    $location.path('/jobs');
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
