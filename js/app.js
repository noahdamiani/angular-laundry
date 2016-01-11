$(document).foundation();

var app = angular.module('app', [
  'ngLoadingSpinner',
  'firebase',
  'ui.router',
  'laundryControllers',
  'angularMoment'
  ]);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/auth');
    
    $stateProvider
      .state('auth', {
        url: '/auth',
        templateUrl: 'partials/auth/authView.html',
        controller: 'AuthController as auth'
      })
      .state('laundryList', {
        url: '/jobs',
        templateUrl: 'partials/laundry-list.html',
        controller: 'LaundryListCtrl'
      })
      .state('laundryJob', {
        url: '/jobs/:jobId',
        templateUrl: 'partials/laundry-job.html',
        controller: 'LaundryJobCtrl'
      })
      .state('archives', {
        url: '/archives',
        templateUrl: 'partials/archives.html',
        controller: 'LaundryArchiveCtrl'
      })
      .state('archivedJob', {
        url: '/archives/:archiveId',
        templateUrl: 'partials/archived-job.html',
        controller: 'LaundryArchivedJobCtrl'
      })
      .state('newJob', {
        url: '/new_job',
        templateUrl: 'partials/new_job.html',
        controller: 'NewJobCtrl'
      });
}]);

app.controller('AuthController', function(){

});

app.controller('HomeController', function ($scope, $location, $firebaseAuth) {
  $scope.siteName = 'Angular Laundry';
  $scope.version = '1.0';
  
  profile = {
    username: 'not logged in',
    avatar: ''
  };

  $scope.userName = profile.username;
  $scope.loginWithFacebook = function() {
    var fb = new Firebase('https://angular-laundry.firebaseio.com');
    fb.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        // Error Handling
      } else {
        return profile = {
          "username": authData.facebook.displayName,
          "avatar": authData.facebook.profileImageURL
        }
      }
    });
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
