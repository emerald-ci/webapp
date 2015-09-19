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
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
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
        url: '/projects',
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      })
      .state('project', {
        abstract: true,
        url: '/projects/:projectId',
        templateUrl: 'views/project.html',
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
          }],
          builds: ['api', 'project', function(api, project) {
              return api.builds(project.id);
          }],
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
      .state('project.build.jobs', {
        url: '',
        controller: 'JobsCtrl',
        templateUrl: 'views/jobs.html',
        resolve: {
          project: ['project', function(project) {
              return project; // inherited from parent state
          }],
          build: ['build', function(build) {
              return build; // inherited from parent state
          }],
          jobs: ['api', 'build', function(api, build) {
              return api.jobs(build.id);
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

      $urlRouterProvider.otherwise('/');
  }]);

angular.module('emeraldApp').run(['$rootScope', '$http', '$location', function ($rootScope, $http, $location) {
    $http.get("/api/v1/auth/active")
        .then(function(response) {
            // all good, we can continue
        }, function(response) {
            // when not logged in (XMLHttpRequest automatically follows redirects but fails on cross origin to GitHub OAuth)
            $location.path('/login');
        });
}]);
