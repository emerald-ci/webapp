'use strict';

describe('Filter: profilePictureFilter', function () {

  // load the filter's module
  beforeEach(module('emeraldApp'));

  // initialize a new instance of the filter before each test
  var profilePictureFilter;
  beforeEach(inject(function ($filter) {
    profilePictureFilter = $filter('profilePictureFilter');
  }));

  it('should return the input prefixed with "profilePictureFilter filter:"', function () {
    var text = 'angularjs';
    expect(profilePictureFilter(text)).toBe('profilePictureFilter filter: ' + text);
  });

});
