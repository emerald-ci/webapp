'use strict';

/**
 * @ngdoc function
 * @name emeraldApp.controller:BuildsCtrl
 * @description
 * # BuildsCtrl
 * Controller of the emeraldApp
 */
angular.module('emeraldApp')
  .controller('BuildsCtrl', ['$scope', '$http', 'project', 'builds', function ($scope, $http, project, builds) {
      $scope.project = project;
      $scope.builds = builds;

      $scope.manuallyTriggerBuild = function() {
          $http.post('/api/v1/projects/' + $scope.project.id + '/builds/trigger/manual').
            then(function(response) {
                console.log(response);
            });
      };
  }]);
