'use strict';

describe('Controller: UserPollCtrl', function () {

  // load the controller's module
  beforeEach(module('basejumpsApp'));

  var UserPollCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserPollCtrl = $controller('UserPollCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
