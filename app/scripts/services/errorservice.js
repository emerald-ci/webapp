'use strict';

/**
 * @ngdoc service
 * @name emeraldApp.errorService
 * @description
 * # errorService
 * Service in the emeraldApp.
 */
angular.module('emeraldApp')
  .service('errorService', function () {
      var _errors = {
          danger: [],
          warning: []
      };

      var _addError = function(type, msg) {
          _errors[type].push(msg);
      };

      var _removeError = function(type, index) {
          _errors[type].splice(index, 1);
      };

      this.errors = _errors;
      this.removeError = _removeError;
      this.addWarning = function(msg) {
          _addError('warning', msg);
      };
      this.anyErrors = function() {
          for (var key in _errors) {
              if (_errors.hasOwnProperty(key)) {
                  if(_errors[key].length > 0) {
                      return true;
                  }
              }
          }
      };
  });
