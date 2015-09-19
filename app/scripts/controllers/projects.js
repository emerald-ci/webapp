'use strict';

/**
 * @ngdoc function
 * @name emeraldApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the emeraldApp
 */
angular.module('emeraldApp')
  .controller('ProjectsCtrl', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
      $http.get('http://localhost:8080/api/v1/projects').
        then(function(response) {
            $scope.projects = response.data;
        });
  }]);
