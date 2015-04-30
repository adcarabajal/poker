(function () {
  'use strict';

  angular.module('api', [])
    .factory('jira', function safeApplyFactory($rootScope, $resource) {

      return {
          backlog : $resource('/backlog',{} , {
            update: { method: 'PUT'}
        }),

        issue:$resource('/issue',{} , {
          update: { method: 'PUT'}
        })
      }

    });

})();
