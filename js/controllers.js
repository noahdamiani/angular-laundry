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
});
