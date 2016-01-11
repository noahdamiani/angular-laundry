var laundryControllers = angular.module('laundryControllers', []);

laundryControllers.controller('LaundryListCtrl', function ($scope, $firebaseArray, $location) {
  var fbArchives = new Firebase("https://angular-laundry.firebaseio.com/archives");
  var fbJobs = new Firebase("https://angular-laundry.firebaseio.com/jobs");
  $scope.jobs = $firebaseArray(fbJobs);
  $scope.archives = $firebaseArray(fbArchives);

  $scope.archiveIt = function() {
    $scope.archives.$add(this.job);
    $scope.jobs.$remove(this.job);
    $location.path('/archives');
  };
});

laundryControllers.controller('LaundryJobCtrl', function ($scope, $stateParams, $firebaseObject) {
  var fb = new Firebase("https://angular-laundry.firebaseio.com/jobs/" + $stateParams.jobId);
  console.log($stateParams);
  $scope.job = $firebaseObject(fb);
});

laundryControllers.controller('LaundryArchiveCtrl', function ($scope, $firebaseArray) {
  var archives = new Firebase("https://angular-laundry.firebaseio.com/archives");
  $scope.archives = $firebaseArray(archives);
});

laundryControllers.controller('LaundryArchivedJobCtrl', function ($scope, $stateParams, $firebaseObject) {
  var archivedJob = new Firebase("https://angular-laundry.firebaseio.com/archives/" + $stateParams.archiveId);
  $scope.archive = $firebaseObject(archivedJob);
});
