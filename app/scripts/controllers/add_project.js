'use strict';

/**
 * @ngdoc function
 * @name emeraldApp.controller:AddProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the emeraldApp
 */
angular.module('emeraldApp')
  .controller('AddProjectCtrl', ['$scope', 'api', '$location', 'errorService', function ($scope, api, $location, errorService) {
      api.githubRepos().
        then(function(response) {
            $scope.github_repos = response;
        });

      $scope.sync = function() {
          api.syncRepos().
            then(function(response) {
                $scope.github_repos = response;
            });
      };

      $scope.add = function(githubRepoId) {
          api.addGithubRepo(githubRepoId).
            then(function(response) {
                $location.path('/');
            }, function(response) {
                response.data.errors.forEach(function(error) {
                    errorService.addWarning(error);
                    $location.path('/');
                });
            });
      };
  }]);
