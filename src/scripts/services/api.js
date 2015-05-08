(function () {
  'use strict';

  angular.module('api', [])
    .factory('jira', function safeApplyFactory($resource, $http) {
      /*$http.defaults.headers.common['Authorization'] = 'Basic ZGFyaW8uY2FyYWJhamFsOmNyZE5hdGcxOA==';

      return {
          backlog : $resource('/backlog',{} , {
            update: { method: 'PUT'}
        }),
        backlog : $resource('https://www.mulesoft.org/jira/rest/greenhopper/1.0/xboard/plan/backlog/data.json?rapidViewId=53&_=1430142451426',{}),

        issue:$resource('/issue',{} , {
          update: { method: 'PUT'}
        })
      }
      */
    });

})();
