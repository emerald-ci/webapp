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

      $scope.event_bus.onmessage = function(message) {
          var json = JSON.parse(message.data);
          if(json.event_type == "new" && json.type == "job") {
              $scope.projects.forEach(function(project) {
                  if(project.id == json.data.project_id) {
                      project.latest_build_result = json.data.state;
                      $scope.$apply();
                  }
              });
          }
          if(json.event_type == "update" && json.type == "job") {
              $scope.projects.forEach(function(project) {
                  if(project.id == json.data.project_id) {
                      project.latest_build_result = json.data.state;
                      $scope.$apply();
                  }
              });
          }
      };
  }]);
