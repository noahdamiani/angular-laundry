var laundryControllers = angular.module('laundryControllers', []);

laundryControllers.controller('LaundryListCtrl', function ($scope, $firebaseArray, $location) {
  var fbArchives = new Firebase("https://angular-laundry.firebaseio.com/archives");
  var fbJobs = new Firebase("https://angular-laundry.firebaseio.com/jobs");
  $scope.jobs = $firebaseArray(fbJobs);
  $scope.archives = $firebaseArray(fbArchives);

  $scope.archiveIt = function() {
    var archiveJob = this.job;
    $scope.archives.$add(archiveJob);
    $scope.jobs.$remove(this.job);
    $location.path('/archives');
  };
});

laundryControllers.controller('LaundryJobCtrl', function ($scope, $routeParams, $firebaseObject) {
  var fb = new Firebase("https://angular-laundry.firebaseio.com/jobs/" + $routeParams.jobId);
  $scope.job = $firebaseObject(fb);
});

laundryControllers.controller('LaundryArchiveCtrl', function ($scope, $firebaseArray) {
  var archives = new Firebase("https://angular-laundry.firebaseio.com/archives");
  $scope.archives = $firebaseArray(archives);
});

laundryControllers.controller('LaundryArchivedJobCtrl', function ($scope, $routeParams, $firebaseObject) {
  var archivedJob = new Firebase("https://angular-laundry.firebaseio.com/archives/" + $routeParams.archiveId);
  $scope.archive = $firebaseObject(archivedJob);
});
