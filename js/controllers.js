var app = angular.module('app', []);

app.controller('HomeController', function ($scope) {
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
