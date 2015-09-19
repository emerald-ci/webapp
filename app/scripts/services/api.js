'use strict';

/**
 * @ngdoc service
 * @name emeraldApp.api
 * @description
 * # api
 * Service in the emeraldApp.
 */
angular.module('emeraldApp')
  .service('api', ['$q', '$http', function ($q, $http) {
      var baseUri = '';

      var apiCallGet = function(resource) {
          var deferred = $q.defer();
          $http.get(baseUri + resource).
            then(function(response) {
                console.log(response);
                return deferred.resolve(response.data);
            }, function(response){
                return deferred.reject();
            });
          return deferred.promise;
      };

      return {
        projects: function() {
            return apiCallGet('/api/v1/projects');
        },
        project: function(projectId) {
            return apiCallGet('/api/v1/projects/' + projectId);
        },
        builds: function(projectId) {
            return apiCallGet('/api/v1/projects/' + projectId + '/builds');
        },
        build: function(buildId) {
            return apiCallGet('/api/v1/builds/' + buildId);
        },
        jobs: function(buildId) {
            return apiCallGet('/api/v1/builds/' + buildId + '/jobs');
        },
        job: function(jobId) {
            return apiCallGet('/api/v1/jobs/' + jobId);
        }
      }
  }]);
