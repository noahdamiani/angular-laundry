var laundryControllers = angular.module('laundryControllers', []);

laundryControllers.factory('FireBase', getFireBaseService);
function getFireBaseService($firebaseArray, $firebaseObject) {
  return {
    getArray: function(url) {
      var ref = new Firebase("https://angular-laundry.firebaseio.com" + url);
      return $firebaseArray(ref);
    },
    getObject: function(url) {
      var ref = new Firebase("https://angular-laundry.firebaseio.com" + url);
      return $firebaseObject(ref);
    }
  }
}

laundryControllers.controller('NewJobCtrl', function ($scope, $location, Jobs) {
  $scope.jobs = Jobs.getJobs();
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

laundryControllers.controller('LaundryListCtrl', function ($scope, $location, $stateParams, FireBase) {
  $scope.jobs = FireBase.getArray('/jobs');
  $scope.archives = FireBase.getArray('/archives');
  $scope.archiveIt = function() {
    $scope.archives.$add(this.job);
    $scope.jobs.$remove(this.job);
    $location.path('/archives');
  };
});

laundryControllers.controller('LaundryJobCtrl', function ($scope, $location, $stateParams, FireBase) { 
  $scope.job = FireBase.getObject('/jobs/' + $stateParams.jobId);
});

laundryControllers.controller('LaundryJobEditCtrl', function ($scope, $stateParams, FireBase) {
  var jobData = FireBase.getObject('/jobs/' + $stateParams.jobId);
  jobData.$bindTo($scope, "job");
});

laundryControllers.controller('LaundryArchiveCtrl', function ($scope, FireBase) {
  $scope.archives = FireBase.getArray('/archives');
});

laundryControllers.controller('LaundryArchivedJobCtrl', function ($scope, $stateParams, FireBase) {
  $scope.archive = FireBase.getObject('/archives/' + $stateParams.archiveId);
});
