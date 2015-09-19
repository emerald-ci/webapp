'use strict';

/**
 * @ngdoc function
 * @name emeraldApp.controller:JobCtrl
 * @description
 * # JobCtrl
 * Controller of the emeraldApp
 */
angular.module('emeraldApp')
  .controller('JobCtrl', ['$scope', '$http', 'project', 'build', 'job', function ($scope, $http, project, build, job) {
      $scope.project = project;
      $scope.build = build;
      $scope.job = job;

      var uri = "ws://" + window.document.location.host + "/api/v1/jobs/" + $scope.job.id + "/logs";
      var ws  = new WebSocket(uri);
      ws.onmessage = function(message) {
          $scope.terminalOutputWebsocket += JSON.parse(message.data).payload.log;
          $scope.$apply();
      };

      $http.get('http://localhost:8080/api/v1/jobs/' + $scope.job.id + '/log').
        then(function(response) {
            response.data.forEach(function(logLine) {
                $scope.terminalOutputPreload += logLine;
            });
        });
  }]);
