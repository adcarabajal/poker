(function () {
  'use strict';

  angular.module('poker')
    .controller('loginCtrl',  function ($scope, $state) {
      (function bootstrap() {

        $scope.login = function(){
          var ref = new Firebase("https://popping-torch-2451.firebaseio.com");
          ref.authWithOAuthPopup("github", function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {

              $state.go('home')
              //$state.go('board', {id:"-JoAWH1PbWz-ICZBrBYS"});
            }
          });
        }


      })();
    });
})();
