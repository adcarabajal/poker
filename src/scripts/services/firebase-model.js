(function () {
  'use strict';

  angular.module('api', [])
    .factory('fbboard', function safeApplyFactory($firebaseArray, $stateParams) {
      var ref = new Firebase("https://popping-torch-2451.firebaseio.com/boards/" + $stateParams.id);

      return $firebaseArray(ref);

    })
    .factory('fbplayer', function safeApplyFactory($firebaseObject, $stateParams) {

      return function(currentAuth){
        var ref = new Firebase("https://popping-torch-2451.firebaseio.com/boards/" + $stateParams.id + "/players");
        return $firebaseObject(ref.child(currentAuth.uid));
      }

    })
    .factory('fbplayers', function safeApplyFactory($firebaseArray, $stateParams) {
      var ref = new Firebase("https://popping-torch-2451.firebaseio.com/boards/" + $stateParams.id + "/players");

      return $firebaseArray(ref);

    })
    .factory('fbbacklog', function safeApplyFactory($firebaseArray, $stateParams) {
      var ref = new Firebase("https://popping-torch-2451.firebaseio.com/boards/" + $stateParams.id + "/backlog");

      return $firebaseArray(ref);
    })
    .factory('fbplay', function safeApplyFactory($firebaseObject, $stateParams) {
      var ref = new Firebase("https://popping-torch-2451.firebaseio.com/boards/" + $stateParams.id + "/play");

      return $firebaseObject(ref);
    })
    .factory('jirabacklog', function safeApplyFactory($resource){

      return {
          backlog : $resource('api/jira/backlog',{} , {
                      update: { method: 'PUT'}
                      })
      }
    });

})();
