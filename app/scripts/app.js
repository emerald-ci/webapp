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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/projects/add', {
        templateUrl: 'views/add_project.html',
        controller: 'AddProjectCtrl',
        controllerAs: 'add_project'
      })
      .when('/projects/:projectId', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'project'
      })
      .when('/jobs/:jobId', {
        templateUrl: 'views/job.html',
        controller: 'JobCtrl',
        controllerAs: 'job'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('emeraldApp').run(['$rootScope', '$http', '$location', function ($rootScope, $http, $location) {
    $http.get("http://localhost:8080/api/v1/auth/active")
        .then(function(response) {
            // all good, we can continue
        }, function(response) {
            // when not logged in (XMLHttpRequest automatically follows redirects but fails on cross origin to GitHub OAuth)
            $location.path('/login');
        });
}]);
