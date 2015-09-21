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

		it('ecscape testing true', function () {
			var someValue = false;
			var el = compile('<input todo-escape="foo()">')(scope);

			scope.foo = function () {
				someValue = !someValue;
			};
			triggerKeyDown(el, 27);
			expect(someValue).toBe(true);

		});

    it('ecscape testing true', function () {
      var someValue = false;
      var el = compile('<input todo-escape="foo()">')(scope);

      scope.foo = function () {
        someValue = !someValue;
      };
      triggerKeyDown(el, 25);
      expect(someValue).toBe(false);

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
