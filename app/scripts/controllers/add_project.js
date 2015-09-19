'use strict';

/**
 * @ngdoc function
 * @name emeraldApp.controller:AddProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the emeraldApp
 */
angular.module('emeraldApp')
  .controller('AddProjectCtrl', ['$scope', '$http', '$location', 'github_repos', function ($scope, $http, $location, github_repos) {
      $scope.github_repos = github_repos;

      $scope.add = function(id) {
          $http.post('/api/v1/github/repos/' + id).
            then(function(response) {
                $location.path('/');
            });
      };
  }]);
