

sanguApp.controller('ListCtrl', function($scope, $location, $routeParams, Data, Checklist) {

  $scope.data = Data;

  $scope.checklist = null;
  $scope.rp = $routeParams;
  if ($scope.rp.id != null) $scope.checklist = Checklist.fetch($scope.rp.id);

  $scope.newStep = {};

  $scope.fileinfo = "";

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

  $scope.addStep = function() {
    console.log("Submitting");
    if (!$scope.newStep.text.length && !$scope.newStep.full.length) {
      return;
    }

    $scope.checklist.steps.push({
      text: $scope.newStep.text,
      full:  $scope.newStep.full
    });

    $scope.newStep = {};
  }

  $scope.moveUp = function(idx) {
    var tmpSteps = $scope.checklist.steps.slice(0);
    var movingStep = tmpSteps.splice(idx,1)[0];
    tmpSteps.splice(idx-1,0,movingStep);
    $scope.checklist.steps = tmpSteps;
  };

  $scope.moveDown = function(idx) {
    var tmpSteps = $scope.checklist.steps.slice(0);
    var movingStep = tmpSteps.splice(idx,1)[0];
    tmpSteps.splice(idx+1,0,movingStep);
    $scope.checklist.steps = tmpSteps;
  };

  $scope.deleteStep = function(idx) {
    var tmpSteps = $scope.checklist.steps.slice(0);
    tmpSteps.splice(idx,1);
    $scope.checklist.steps = tmpSteps;
  };

  $scope.addStep = function() {
    $scope.checklist.steps.push({
      text: $scope.newStep.text,
      full: $scope.newStep.full
    });
    $scope.newStep = {};
    // It'd be nice to change the focus to go back to the newStep's Short
    // Description.
  }

  $scope.updateChecklist = function() {
  };

  $scope.addChecklist = function() {
    Checklist.add({
      id: Checklist.generateId(),
      name: $scope.checklist_name,
      steps: []
    });
    $location.path( "/edit/" + id );
  };

  $scope.download = function() {
    var cl = {
      'name' : $scope.checklist.name,
      'steps' : []
    };
    $scope.checklist.steps.forEach(
      function (s) {
        cl.steps.push({
          'text': s.text,
          'full': s.full
        });
      }
    );
    var clblob = new Blob([JSON.stringify(cl, undefined, 2)], {'type':'application/json'});
    var dl = document.createElement("a");
    dl.href = window.webkitURL.createObjectURL(clblob);
    dl.download = "";
    dl.click();
  };

  $scope.setFile = function(element) {
    $scope.$apply(function($scope) {
      $scope.fileinfo = "notloaded";
      var fileToLoad = element.files[0];
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent)  {
        console.log(fileLoadedEvent.target.result);
        var textFromFileLoaded = fileLoadedEvent.target.result;
        $scope.fileinfo = textFromFileLoaded;
        $scope.$apply();
      };
      fileReader.readAsText(fileToLoad, "UTF-8");
    });
  };

  $scope.loadChecklist = function() {
    var rs = {
      id: Checklist.generateId(),
      steps: []
    };
    try {
      var cl = JSON.parse($scope.fileinfo);
      if (cl.name) {
        rs.name = cl.name;
        cl.steps.forEach(function (s) {
          rs.steps.push({
            'text': s.text,
            'full': s.full
          });
        });
        Checklist.add(rs);
        $location.path( "/edit/" + id );
      }
    } catch (err) {
      console.log("Unable to parse");
    }
  };

});


sanguApp.controller('SearchCtrl', function($scope, Data, Checklist) {

  $scope.data = Data;
  $scope.results = [];

  $scope.search = function() {
    $scope.results = Checklist.list();
  };

});

