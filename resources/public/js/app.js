


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

sanguApp.service('Checklist', function() {

  this.generateId = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
  };

  this.list = function() {
    var result = [];
    var cllist = JSON.parse(localStorage.getItem('sangu.cllist'));
    cllist.forEach( function(id) {
      var cl = JSON.parse(localStorage.getItem('sangu.cl.' + id));
      result.push({
        "id" : cl.id,
        "name" : cl.name
      });
    });
    return result;
  };

  this.fetch = function(id) {
    return JSON.parse(localStorage.getItem('sangu.cl.' + id));
  };

  this.add = function(cl) {
    var clString = JSON.stringify(cl);
    var cllist = JSON.parse(localStorage.getItem('sangu.cllist'));
    cllist.push(cl.id);
    var cllistString = JSON.stringify(cllist);
    localStorage.setItem('sangu.cl.' + cl.id, clString);
    localStorage.setItem('sangu.cllist', cllistString);
  };

});

