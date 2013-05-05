

sanguApp.controller('ListCtrl', function($scope, $routeParams, Data, Checklist) {

  $scope.data = Data;

  $scope.checklist = null;
  $scope.rp = $routeParams;
  if ($scope.rp.id != null) $scope.checklist = Checklist[$scope.rp.id];

  if ($scope.checklist != null) {
    $scope.checklist_id = $scope.checklist.id;
    $scope.checklist_name = $scope.checklist.name;
    $scope.steps = $scope.checklist.steps;
  }

  $scope.toggleCompleted = function(step) {
    if ($scope.isCompleted(step)) {
      step.completed = null;
    } else {
      step.completed = new Date();
    };
  };

  $scope.isCompleted = function(step) {
    return step.completed != null;
  };

  $scope.isDisabled = function(step) {
    return false;
  };

  $scope.toggleShow = function(step) {
    if (step.show == null) {
      step.show = true;
    } else {
      step.show = null;
    }
  }

  $scope.showFull = function(step) {
    return step.show;
  }

});


sanguApp.controller('SearchCtrl', function($scope, Data, Checklist) {

  $scope.data = Data;
  $scope.checklist = Checklist;
  $scope.results = [];

  for (var key in $scope.checklist) $scope.results.push($scope.checklist[key]);

});

