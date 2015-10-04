'use strict';

/**
 * @ngdoc function
 * @name emeraldApp.controller:AddProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the emeraldApp
 */
angular.module('emeraldApp')
  .controller('AddProjectCtrl', ['$scope', 'api', '$state', 'errorService', 'syncState', function ($scope, api, $state, errorService, syncState) {
      $scope.syncing = syncState.sync_in_progress;

      $scope.loadRepos = function() {
          api.githubRepos().
            then(function(response) {
                $scope.githubRepos = response;
            });
      };
      $scope.loadRepos();

      $scope.event_bus.onmessage = function(message) {
          var json = JSON.parse(message.data);
          console.log(message);
          if(json.event_type == "done" && json.type == "github_sync") {
              $scope.syncing = false;
              $scope.githubRepos = null;
              $scope.loadRepos();
          }
      };

      $scope.sync = function() {
          $scope.syncing = true;
          $scope.githubRepos = null;
          api.syncRepos();
      };

      $scope.add = function(githubRepoId) {
          $scope.githubRepos.forEach(function(repo) {
              if(repo.github_repo_id == githubRepoId) {
                  repo.adding = true;
              }
          });
          api.addGithubRepo(githubRepoId).
            then(function(response) {
                $state.go('project.builds', { projectId: response.id })
            }, function(response) {
                $scope.adding = null;
                $scope.githubRepos.forEach(function(repo) {
                    if(repo.github_repo_id == githubRepoId) {
                        repo.errors = response.data.errors;
                        repo.adding = false;
                    }
                });
            });
      };

  }]);
