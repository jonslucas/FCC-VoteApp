'use strict';

describe('Service: Polls', function () {

  // load the service's module
  beforeEach(module('basejumpsApp'));

  // instantiate service
  var Polls;
  beforeEach(inject(function (_Polls_) {
    Polls = _Polls_;
  }));

  it('should do something', function () {
    expect(!!Polls).toBe(true);
  });

});
