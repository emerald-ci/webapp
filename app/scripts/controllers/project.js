'use strict';

/**
 * @ngdoc function
 * @name emeraldApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the emeraldApp
 */
angular.module('emeraldApp')
  .controller('ProjectCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
      $http.get('/api/v1/projects/' + $routeParams.projectId).
        then(function(response) {
            $scope.project = response.data;
        });
      $http.get('/api/v1/projects/' + $routeParams.projectId + '/builds').
        then(function(response) {
            $scope.builds = response.data;
        });
      $scope.loadJobsForBuild = function(buildId) {
          $http.get('/api/v1/builds/' + buildId + '/jobs').
            then(function(response) {
                $scope.jobs = response.data;
            });
      };
  }]);
