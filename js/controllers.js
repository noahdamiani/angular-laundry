var laundryControllers = angular.module('laundryControllers', []);

laundryControllers.controller('LaundryListCtrl', function ($scope, $firebaseArray) {
  var fb = new Firebase("https://angular-laundry.firebaseio.com/jobs");
  $scope.jobs = $firebaseArray(fb);
});

laundryControllers.controller('LaundryJobCtrl', function ($scope, $routeParams, $firebaseObject) {
  var fb = new Firebase("https://angular-laundry.firebaseio.com/jobs/" + $routeParams.jobId);
  $scope.job = $firebaseObject(fb);
});
