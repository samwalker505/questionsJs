'use strict';

describe('sorting the list of users', function() {
  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
    //    var sorted = sortUsers(users);
    //    expect(sorted).toEqual(['jeff', 'jack', 'igor']);
  });
});

describe('TodoCtrl', function() {
  beforeEach(module('todomvc'));
  // variables for injection
  var controller;
  var scope;
  var location;
  var firebaseArray;
  var sce;
  var localStorage;
  var window;

  // Injecting variables
  // http://stackoverflow.com/questions/13664144/how-to-unit-test-angularjs-controller-with-location-service
  beforeEach(inject(function($location,
    $rootScope,
    $controller,
    $firebaseArray,
    $localStorage,
    $sce,
    $window){
      // The injector unwraps the underscores (_) from around the parameter names when matching

      scope = $rootScope.$new();

      location = $location;
      controller = $controller;
      firebaseArray = $firebaseArray;
      sce = $sce;
      localStorage = $localStorage;
      window = $window;
    }));

    describe('TodoCtrl Testing', function() {
      it('setFirstAndRestSentence', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });

        var testInputs = [
          {str:"Hello? This is Sung", exp: "Hello?"},
          {str:"Hello.co? This is Sung", exp: "Hello.co?"},
          {str:"Hello.co This is Sung", exp: "Hello.co This is Sung"},
          {str:"Hello.co \nThis is Sung", exp: "Hello.co \n"},
          {str:"! Hello co This is Sung", exp: "!"},
          {str:"Hello co. This is Sung", exp: "Hello co."},
          {str:"Hello co This is Sung", exp: "Hello co This is Sung"},
          {str:"Hello?? This is Sung", exp: "Hello??"},
          {str:"..Hello?? This is Sung", exp: "..Hello??"},
        ];

        for (var i in testInputs) {
          var results = scope.getFirstAndRestSentence(testInputs[i].str);
          expect(results[0]).toEqual(testInputs[i].exp);
        }
      });

      it('RoomId', function() {
        location.path('/new/path');

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });

        expect(scope.roomId).toBe("new");
      });

      it('RoomId all', function() {
        location.path('/');

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });

        expect(scope.roomId).toBe("all");
      });

      it('toTop Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.toTop();
        expect(window.scrollX).toBe(0);
        expect(window.scrollY).toBe(0);
      });
    });

    it('increaseMax testing', function increaseMaxTesing() {
      // body...
      var ctrl = controller('TodoCtrl', {
        $scope: scope
      });
      scope.maxQuestion = 2;
      scope.totalCount = 3;
      scope.increaseMax();
      expect(scope.maxQuestion).toEqual(12);
    });

    // it('Facebook login ', function facebookLoginTest() {
    //   // body...
    //   var ctrl = controller('TodoCtrl', {
    //     $scope: scope,
    //     $location: location,
    //     $firebaseArray: firebaseArray,
    //     $sce: sce,
    //     $localStorage: localStorage,
    //     $window: window
    //   });
    //
    //   scope.FBLogin();
    //   expect(scope.isAdmin).toBe(true);
    //
    // });

    it('Facebook logout ', function facebookLoginTest() {
      // body...
      var ctrl = controller('TodoCtrl', {
        $scope: scope,
        $location: location,
        $firebaseArray: firebaseArray,
        $sce: sce,
        $localStorage: localStorage,
        $window: window
      });

      scope.FBLogout();
      expect(scope.isAdmin).toBe(false);

    });

    it('clearCompletedTodos testing', function (argument) {
      // body...
      var ctrl = controller('TodoCtrl', {
        $scope: scope,
        $location: location,
        $firebaseArray: firebaseArray,
        $sce: sce,
        $localStorage: localStorage,
        $window: window
      });

      var todo = {
        completed: true
      }

      var todo2 = {
        completed: false
      }

      scope.todos = [];
      scope.todos.push(todo);
      scope.todos.push(todo2);
      scope.clearCompletedTodos();
    });

    it('doneEditing testing', function (argument) {
      // body...
      var ctrl = controller('TodoCtrl', {
        $scope: scope,
        $location: location,
        $firebaseArray: firebaseArray,
        $sce: sce,
        $localStorage: localStorage,
        $window: window
      });

      var todo = {
        wholeMsg: "hi "
      }

      var todo2 = {
        wholeMsg: ""
      }

      scope.todos = [];
      scope.doneEditing(todo);
      scope.doneEditing(todo2);
    })

    it('addTodo testing', function () {
      var ctrl = controller('TodoCtrl', {
        $scope: scope,
        $location: location
      });
      scope.input = {};
      scope.input.wholeMsg = ' ';
    });

    // it('facebook login', function () {
    //   var ctrl = controller('TodoCtrl', {
    //     $scope: scope,
    //     $location: location
    //   });
    //   spyOn(scope, 'FBlogin').and.callFake(function () {
    //
    //   })
    // })

    it('watchCollection test', function() {
      scope.todos = [];
      var dump = "";
      var todo = {
        completed: true,
        wholeMsg: "abced"
      }

      var todo2 = {
        completed: false,
        head: "abced",
        wholeMsg: "abced"
      }
      scope.todos.push(dump);
      scope.todos.push(todo);
      scope.todos.push(todo2);
      var ctrl = controller('TodoCtrl', {
        $scope: scope,
        $location: location
      });
      scope.todos.push(todo);
      scope.todos.push(todo2);
      scope.$digest();

    });

    it('addTodo test', function () {
      scope.input = {};
      scope.input.wholeMsg = "";
      var ctrl = controller('TodoCtrl', {
        $scope: scope,
        $location: location
      });
      scope.addTodo();
      scope.input.wholeMsg = "abcd sjpojpo";
      scope.addTodo();

    })

  });
