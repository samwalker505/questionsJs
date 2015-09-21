var triggerKeyDown = function (element, keyCode) {
		var e = jQuery.Event("keydown");
		e.keyCode = keyCode;
		element.triggerHandler(e);
	};

	describe('todoEscape directive', function () {
		var scope, compile, browser;
    beforeEach(module('todomvc'));
		beforeEach(inject(function ($rootScope, $compile, $browser) {
			scope = $rootScope.$new();
			compile = $compile;
			browser = $browser;
		}));

		it('should evaluate the expression binded to the directive', function () {
			var someValue = false,
				el = angular.element('<input todo-escape="doSomething()">');

			scope.doSomething = function () {
				someValue = !someValue;
			};

			compile(el)(scope);

			triggerKeyDown(el, 27);

			expect(someValue).toBe(true);
      triggerKeyDown(el, 25);
      expect(someValue).tobe(false);
		});
	});

describe('todoFocus directive', function () {
		var scope, compile, browser;
    beforeEach(module('todomvc'));
		beforeEach(inject(function ($rootScope, $compile, $browser) {
			scope = $rootScope.$new();
			compile = $compile;
			browser = $browser;
		}));

		it('should focus on truthy expression', function () {
			var el = angular.element('<input todo-focus="focus">');
			scope.focus = false;

			compile(el)(scope);
			expect(browser.deferredFns.length).toBe(0);

			scope.$apply(function () {
				scope.focus = true;
			});

      scope.$apply(function () {
        scope.focus = false;
      });

			expect(browser.deferredFns.length).toBe(1);
		});
	});
