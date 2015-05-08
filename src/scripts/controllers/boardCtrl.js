(function () {
  'use strict';

  angular.module('poker')
    .controller('boardCtrl', function ($scope, currentAuth, fbboard, fbplayer, fbplayers, fbbacklog, fbplay) {
      (function bootstrap() {


          $scope.player = fbplayer(currentAuth);
          $scope.players = fbplayers;
          $scope.backlog = fbbacklog;
          $scope.play = fbplay;


          $scope.backlog.$loaded(function(){

            $scope.play.$loaded(function(){
              $scope.current = $scope.backlog[1];
              console.log($scope.current);
            });
          });

          $scope.player.$loaded(function() {

            if (!$scope.player.value) {
              $scope.player.value = {
                displayName: currentAuth.github.displayName,
                username: currentAuth.github.username,
                avatar: currentAuth.github.cachedUserProfile.avatar_url
              };

              $scope.player.$save().then(function() {
                console.log('Profile saved to Firebase!');
              }).catch(function(error) {
                console.log(error);
              });
            }
          });

          $scope.players.$loaded(function(){
            //console.log("players", $scope.players);
          });



      })();
    });
})();
