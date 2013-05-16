


/**
 * The main Sangu app module
 *
 * @type {angular.Module}
 */
var sanguApp = angular.module('sanguApp', [], function ($compileProvider) {
  $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file):/);
});

sanguApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {}).
    when('/edit/:id', {templateUrl:'partials/edit.html', controller: 'ListCtrl'}).
    when('/list/:id', {templateUrl:'partials/list.html', controller: 'ListCtrl'}).
    when('/new', {templateUrl:'partials/new.html', controller: 'ListCtrl'}).
    when('/load', {templateUrl:'partials/load.html', controller: 'ListCtrl'}).
    otherwise({});
}]);

sanguApp.factory('Data', function() {
  return {message: ""};
});

sanguApp.factory('Checklist', function() {
  var checklist = {};

  checklist['7084a7e5-c4fa-485b-a84c-2d3f624daf52'] = {
    id: '7084a7e5-c4fa-485b-a84c-2d3f624daf52',
    name: 'First Checklist',
    steps: [
      {text: "This is the first item. Here is some filler text to see what happens.",
       full: "This is the full description of this step. It's supposed to have many many more items of use. But right now it's just something to fill up space."},
      {text: "This is the second item.",
       full: "This is the full description of this step. It's supposed to have many many more items of use. But right now it's just something to fill up space."},
      {text: "This is the third item.",
       full: "This is the full description of this step. It's supposed to have many many more items of use. But right now it's just something to fill up space."}
    ]
  };
  checklist['849322c7-d51c-4300-bf23-8c6855dfd670'] = {
    id: '849322c7-d51c-4300-bf23-8c6855dfd670',
    name: 'Second Checklist',
    steps: [
      {text: "First item of the second list.",
       full: "This is the full description of this step. It's supposed to have many many more items of use. But right now it's just something to fill up space."},
      {text: "Second item of the second list.",
       full: "This is the full description of this step. It's supposed to have many many more items of use. But right now it's just something to fill up space."},
      {text: "Third item of the second list.",
       full: "This is the full description of this step. It's supposed to have many many more items of use. But right now it's just something to fill up space."}
    ]
  };

  return checklist;
});

