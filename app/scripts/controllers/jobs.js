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

      $scope.event_bus.onmessage = function(message) {
          var json = JSON.parse(message.data);
          if(json.event_type == "new" && json.type == "job") {
              if($scope.build.id == json.data.build_id) {
                  $scope.jobs.push(json.data);
                  $scope.$apply();
              }
          }
          if(json.event_type == "update" && json.type == "job") {
              $scope.jobs.forEach(function(job) {
                  if(job.id == json.data.id) {
                      job.state = json.data.state;
                      $scope.$apply();
                  }
              });
          }
      };
  }]);
