'use strict';

describe('Directive: userDashboard', function () {

  // load the directive's module and view
  beforeEach(module('basejumpsApp'));
  beforeEach(module('app/userDashboard/userDashboard.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<user-dashboard></user-dashboard>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the userDashboard directive');
  }));
});