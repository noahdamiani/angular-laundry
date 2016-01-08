var app = angular.module('app', [
  'ngLoadingSpinner',
  'firebase',
  'ngRoute',
  'laundryControllers',
  'angularMoment'
  ]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/jobs', {
      templateUrl: 'partials/laundry-list.html',
      controller: 'LaundryListCtrl'
    }).
    when('/jobs/:jobId', {
      templateUrl: 'partials/laundry-job.html',
      controller: 'LaundryJobCtrl'
    }).
    when('/archives', {
      templateUrl: 'partials/archives.html',
      controller: 'LaundryArchiveCtrl'
    }).
    when('/new_job', {
      templateUrl: 'partials/new_job.html',
      controller: 'NewJobCtrl'
    }).
    otherwise({
      redirectTo: '/jobs'
    });
  }]);

app.controller('HomeController', function ($scope, $location) {
  $scope.siteName = 'Angular Laundry';
  $scope.version = '1.0';
  $scope.go = function (path) {
    $location.path(path);
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
