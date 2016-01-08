var app = angular.module('app', [
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
