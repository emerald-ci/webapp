'use strict';

/**
 * @ngdoc filter
 * @name emeraldApp.filter:profilePictureFilter
 * @function
 * @description
 * # profilePictureFilter
 * Filter in the emeraldApp.
 */
angular.module('emeraldApp')
  .filter('profilePictureFilter', function () {
    return function (input) {
        if(input == '') {
            return '';
        }
        return '<img class="img-rounded" src="' + input + '&s=30" />';
    };
  });
