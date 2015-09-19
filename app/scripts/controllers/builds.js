'use strict';

/**
 * @ngdoc function
 * @name emeraldApp.controller:BuildsCtrl
 * @description
 * # BuildsCtrl
 * Controller of the emeraldApp
 */
angular.module('emeraldApp')
  .controller('BuildsCtrl', ['$scope', 'project', 'builds', function ($scope, project, builds) {
      $scope.project = project;
      $scope.builds = builds;
  }]);
