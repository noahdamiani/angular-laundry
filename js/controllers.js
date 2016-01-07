var app = angular.module('app', ['firebase']);

app.controller('HomeController', function ($scope, $firebaseObject) {
  var fb = new Firebase("https://angular-laundry.firebaseio.com");
  var syncObj = $firebaseObject(fb);

  syncObj.$bindTo($scope, "data");

  //$scope.data = syncObj;
  $scope.siteName = 'Angular Laundry';
  $scope.version = '1.0';
  $scope.linkItems = [
    {'url': 'http://google.com',
     'name': 'Google'},
    {'url': 'http://firebase.io',
     'name': 'Firebase'},
    {'url': 'http://angularjs.org',
     'name': 'AngularJS'}
  ];

  $scope.jobs = [
    {'id': '1',
    'time': '1:45pm',
    'type': 'Normal Wash and Fold',
    'name': 'Noah Damiani',
    'status': 'Not Started'},
    {'id': '2',
    'time': '10:00am',
    'type': 'Organic Wash and Fold',
    'name': 'Patrick Wilson',
    'status': 'completed'},
    {'id': '3',
    'time': '9:00am',
    'type': 'Normal Wash and Fold',
    'name': 'Gabby Namm',
    'status': 'picked up'}
  ];
});
