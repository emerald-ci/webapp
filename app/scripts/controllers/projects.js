'use strict';

/**
 * @ngdoc function
 * @name emeraldApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the emeraldApp
 */
angular.module('emeraldApp')
  .controller('ProjectsCtrl', ['$scope', 'projects', function ($scope, projects) {
      $scope.projects = projects;
  }]);
