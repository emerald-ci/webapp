'use strict';

/**
 * @ngdoc function
 * @name emeraldApp.controller:AddProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the emeraldApp
 */
angular.module('emeraldApp')
  .controller('AddProjectCtrl', ['$scope', '$http', function ($scope, $http) {
      $http.get('/api/v1/github/repos').
        then(function(response) {
            $scope.projects = response.data;
        });

      $scope.add = function(id) {
          $http.post('http://localhost:8080/api/v1/github/repos/' + id).
            then(function(response) {
                console.log(response);
            });
      };
  }]);
