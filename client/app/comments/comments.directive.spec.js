'use strict';

describe('Directive: comments', function () {

  // load the directive's module and view
  beforeEach(module('basejumpsApp'));
  beforeEach(module('app/comments/comments.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<comments></comments>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the comments directive');
  }));
});