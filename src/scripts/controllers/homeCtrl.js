(function () {
  'use strict';

  angular.module('poker')
    .controller('homeCtrl', function ($scope, currentAuth, $http) {
      (function bootstrap() {

        $scope.create = true;
        $scope.select = false;

        $scope.loadBacklog = function(){


            $http.post('/api/jira/backlog', {url:$scope.jiraurl, user:$scope.user, pass: $scope.password}).
              success(function(data, status, headers, config) {
                $scope.create = false;
                $scope.select = true;
                $scope.backlog = data;
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });





       }


      })();
    });
})();
