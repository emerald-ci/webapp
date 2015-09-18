'use strict';

/**
 * @ngdoc function
 * @name emeraldApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the emeraldApp
 */
angular.module('emeraldApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
      $http.get('http://localhost:8080/api/v1/projects').
        then(function(response) {
            $scope.projects = response.data;
        });
  }]);
