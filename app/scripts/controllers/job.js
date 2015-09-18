'use strict';

/**
 * @ngdoc function
 * @name emeraldApp.controller:JobCtrl
 * @description
 * # JobCtrl
 * Controller of the emeraldApp
 */
angular.module('emeraldApp')
  .controller('JobCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
      var uri = "ws://" + window.document.location.host + "/api/v1/jobs/" + $routeParams.jobId + "/logs";
      var ws  = new WebSocket(uri);
      ws.onmessage = function(message) {
          $scope.terminalOutput += JSON.parse(message.data).payload.log;
          $scope.$apply();
      };
  }]);
