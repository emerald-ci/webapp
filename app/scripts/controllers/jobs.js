'use strict';

/**
 * @ngdoc function
 * @name emeraldApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the emeraldApp
 */
angular.module('emeraldApp')
  .controller('JobsCtrl', ['$scope', 'project', 'build', 'jobs', function ($scope, project, build, jobs) {
      $scope.project = project;
      $scope.build = build;
      $scope.jobs = jobs;
  }]);
