describe('Unit testing on todo directives', function() {
  var $compile,
      $rootScope;

  // Load the todomvc module, which contains the directive
  beforeEach(module('todomvc'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('test todo blur', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<todo-blur></todo-blur>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    element.blur();
    // Check that the compiled element contains the templated content
    // expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
  });

  it('test todo focus', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<todo-focus></todo-focus>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    // expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
  });

  it('test todo escape', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<todo-escape></todo-escape>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    var e = angular.element.Event('keydown');
    e.which = 27;
    element.triggerHandler('keydown');
    // Check that the compiled element contains the templated content
    // expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
  });
});
