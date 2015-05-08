(function () {
    'use strict';

    var app = angular.module('poker', [
        //'angular-ui',
        'ui.bootstrap',
        'ui.bootstrap.modal',
        'ui.bootstrap.tpls',
        'ngResource',
        'ui.select',
        'firebase',
        'ui.router',
        'ngSanitize',

        // project
        'api'

    ]);

    app.factory("Auth", ["$firebaseAuth",
      function($firebaseAuth) {
        var ref = new Firebase("https://popping-torch-2451.firebaseio.com");
        return $firebaseAuth(ref);
      }
    ]);

    // for ui-router
    app.run(["$rootScope", "$state", function($rootScope, $state) {
        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
            if (error === "AUTH_REQUIRED") {
              $state.go("home");
            }
          });
    }]);

    app.config(["$stateProvider" , "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
        .state("login", {

          url: "/",
          controller: "loginCtrl",
          templateUrl: "views/login.html"
        })
        .state("home", {

          url: "/home",
          controller: "homeCtrl",
          templateUrl: "views/home.html",
          resolve: {
            "currentAuth": ["Auth", function(Auth) {
              return Auth.$waitForAuth();
            }]
          }
        })
        .state("board", {
          url: "/board/:id",
          controller: "boardCtrl",
          templateUrl: "views/board.html",
          resolve: {
            "currentAuth": ["Auth", function(Auth) {
              return Auth.$requireAuth();
            }]
          }
        });
    }]);
})();
