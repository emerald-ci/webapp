'use strict';

/**
 * @ngdoc overview
 * @name emeraldApp
 * @description
 * # emeraldApp
 *
 * Main module of the application.
 */
angular
  .module('emeraldApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('projects', {
        url: '/',
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      })
      .state('add_project', {
        url: '/add_project',
        templateUrl: 'views/add_project.html',
        controller: 'AddProjectCtrl',
        resolve: {
          syncState: ['api', function(api) {
              return api.githubRepoSyncState();
          }]
        }
      })
      .state('project', {
        abstract: true,
        url: '/projects/:projectId',
        template: '<div ui-view></div>',
        resolve: {
          project: ['$stateParams', 'api', function($stateParams, api) {
              return api.project($stateParams.projectId);
          }]
        }
      })
      .state('project.builds', {
        url: '',
        templateUrl: 'views/builds.html',
        controller: 'BuildsCtrl',
        resolve: {
          project: ['project', function(project) {
              return project; // inherited from parent state
          }]
        }
      })
      .state('project.build', {
        abstract: true,
        url: '/builds/:buildId',
        template: '<div ui-view></div>',
        resolve: {
          project: ['project', function(project) {
              return project; // inherited from parent state
          }],
          build: ['$stateParams', 'api', function($stateParams, api) {
              return api.build($stateParams.buildId);
          }]
        }
      })
      .state('project.build.job', {
        url: '/jobs/:jobId',
        templateUrl: 'views/job.html',
        controller: 'JobCtrl',
        resolve: {
          project: ['project', function(project) {
              return project; // inherited from parent state
          }],
          build: ['build', function(build) {
              return build; // inherited from parent state
          }],
          job: ['$stateParams', 'api', function($stateParams, api) {
              return api.job($stateParams.jobId);
          }]
        }
      });

      $urlRouterProvider.when('/', '/projects');
      $urlRouterProvider.otherwise('/');
  }]);

angular.module('emeraldApp').run(['$rootScope', '$http', '$location', 'errorService', function ($rootScope, $http, $location, errorService) {
    $http.get("/api/v1/profile")
        .then(function(response) {
            console.log(response);
            $rootScope.profile = response.data;

            var uri = "ws://" + window.document.location.host + "/api/v1/events";
            $rootScope.event_bus = new WebSocket(uri);
            $rootScope.event_bus.onmessage = function(message) {
                console.log(message);
            };
        }, function(response) {
            // when not logged in (XMLHttpRequest automatically follows redirects but fails on cross origin to GitHub OAuth)
            $location.path('/login');
        });

    $rootScope.dismissAlert = function(type, index) {
        errorService.removeError(type, index);
    };
    $rootScope.anyErrors = errorService.anyErrors;
    $rootScope.errors = errorService.errors;
}]);
