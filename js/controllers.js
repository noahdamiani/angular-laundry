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
    var type = $scope.type;

    $scope.jobs.$add({
      name: $scope.jobName,
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

laundryControllers.controller('LaundryListCtrl', function ($scope, $location, Jobs, Archives) {
  $scope.jobs = Jobs;
  $scope.archives = Archives;
  $scope.archiveIt = function() {
    $scope.archives.$add(this.job);
    $scope.jobs.$remove(this.job);
    $location.path('/archives');
  };
});

laundryControllers.controller('LaundryJobCtrl', function ($scope, $location, Job) {
  $scope.job = Job;
});

laundryControllers.controller('LaundryJobEditCtrl', function ($scope, Job) {
  Job.$bindTo($scope, "job");
});

laundryControllers.controller('LaundryArchiveCtrl', function ($scope, Archives) {
  $scope.archives = Archives;
});

laundryControllers.controller('LaundryArchivedJobCtrl', function ($scope, Archive) {
  $scope.archive = Archive;
});
