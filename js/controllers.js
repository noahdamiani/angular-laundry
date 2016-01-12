var laundryControllers = angular.module('laundryControllers', []);

laundryControllers.factory('Jobs', getJobsService);
function getJobsService($firebaseArray) {
  var ref = new Firebase("https://angular-laundry.firebaseio.com/jobs/");
  return $firebaseArray(ref);
}

laundryControllers.factory('Job', getJobService);
function getJobService($firebaseObject, $stateParams) {
  var ref = new Firebase("https://angular-laundry.firebaseio.com/jobs/" + $stateParams.jobId);
  return $firebaseObject(ref);
}

laundryControllers.factory('Archives', getArchivesService);
function getArchivesService($firebaseArray) {
  var ref = new Firebase("https://angular-laundry.firebaseio.com/archives/");
  return $firebaseArray(ref);
}

laundryControllers.factory('Archive', getArchiveService);
function getArchiveService($firebaseObject, $stateParams) {
  var ref = new Firebase("https://angular-laundry.firebaseio.com/archives/" + $stateParams.archiveId);
  return $firebaseObject(ref);
}

laundryControllers.controller('NewJobCtrl', function ($scope, $location, Jobs) {
  $scope.jobs = Jobs;
  
  $scope.addJob = function() {
    var date = new Date();

    $scope.jobs.$add({
      name: $scope.jobName,
      phone: $scope.phone,
      createdAt: date.toString(),
      type: $scope.type[0],
      status: {
        details: 'not started',
        done: false
      }
    });

    $location.path('/jobs');
  };
});

laundryControllers.controller('LaundryListCtrl', function ($scope, $location, $stateParams, Jobs, Archives) {
  $scope.jobs = Jobs;
  $scope.archives = Archives;
  $scope.archiveIt = function() {
    $scope.archives.$add(this.job);
    $scope.jobs.$remove(this.job);
    $location.path('/archives');
  };
});

laundryControllers.controller('LaundryJobCtrl', function ($scope, $location, $stateParams, $firebaseObject, Job) {
  //$scope.job = Job;
  var fb = new Firebase("https://angular-laundry.firebaseio.com/jobs/" + $stateParams.jobId);
  $scope.job = $firebaseObject(fb);
});

laundryControllers.controller('LaundryJobEditCtrl', function ($scope, Job) {
  Job.$bindTo($scope, "job");
});

laundryControllers.controller('LaundryArchiveCtrl', function ($scope, Archives) {
  $scope.archives = Archives;
});

laundryControllers.controller('LaundryArchivedJobCtrl', function ($scope, $stateParams, $firebaseObject, Archive) {
  //$scope.archive = Archive;
  var fb = new Firebase("https://angular-laundry.firebaseio.com/archives/" + $stateParams.archiveId);
  $scope.archive = $firebaseObject(fb);
});
