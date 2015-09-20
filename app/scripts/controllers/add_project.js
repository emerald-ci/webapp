'use strict';

/**
 * @ngdoc function
 * @name emeraldApp.controller:AddProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the emeraldApp
 */
angular.module('emeraldApp')
  .controller('AddProjectCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
      $scope.github_repos = $http.get('/api/v1/github/repos').
        then(function(response) {
            $scope.github_repos = response.data
        });

      $scope.sync = function() {
          $http.post('/api/v1/github/repos/sync').
            then(function(response) {
            $scope.github_repos = response.data
            });
      };

      $scope.add = function(id) {
          $http.post('/api/v1/github/repos/' + id).
            then(function(response) {
                $location.path('/');
            });
      };
  }]);
