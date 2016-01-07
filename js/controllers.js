var laundryControllers = angular.module('laundryControllers', []);

laundryControllers.controller('LaundryListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('/angular-laundry/data/fixtures.json').success(function(data) {
      $scope.jobs = data;
    });
  }]);

laundryControllers.controller('LaundryJobCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $scope.jobId = $routeParams.jobId;
    $http.get('/angular-laundry/data/fixtures.json').success(function(data) {
      $scope.job = data[$routeParams.jobId-1];
    });
  }]);
