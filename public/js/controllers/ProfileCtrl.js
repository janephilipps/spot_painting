angular.module('ProfileCtrl', []).controller('ProfileController', ['AuthService', '$scope', '$http', '$location', '$routeParams', '$timeout', function(AuthService, $scope, $http, $location, $routeParams, $timeout) {

  var profileUserId = $routeParams.id;
  if (!profileUserId) {
    if (AuthService.isLoggedIn()) {
      profileUserId = AuthService.getLoggedInUser()._id;
    } else {
      $location.path('/login');
    }
  }

  $http.get('/api/users/' + profileUserId)
    .success(function (user) {
      $scope.profileUser = user;
    });

  $http.get('/api/paintings?user=' + profileUserId)
    .success(function (paintings) {
      $scope.paintings = paintings;
      $timeout(function() {
        $scope.renderCanvas();
      });
    });

  $scope.isSameUser = function () {
    return $scope.profileUser &&
           AuthService.isLoggedIn() &&
           ($scope.profileUser._id === AuthService.getLoggedInUser()._id);
  };

  $scope.renderCanvas = function() {

    var paintings = $scope.paintings;

    var canvases = document.getElementsByClassName('painting');

    for (var k = 0; k < paintings.length; k++) {
      // debugger;
      var canvas = canvases[k].children[0];
      var ctx = canvas.getContext('2d');
      ctx.canvas.width = (paintings[k].columns * 25) + ((paintings[k].columns - 1) * 20);
      ctx.canvas.height = (paintings[k].rows * 25) + ((paintings[k].rows - 1) * 20);
      var x = 12.5;
      var y = 12.5;

      ctx.fillStyle = '#FFF';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      for (var j = 0; j < paintings[k].painting.length; j++) {
        for (var i = 0; i < paintings[k].painting[j].length; i++) {
          ctx.fillStyle = paintings[k].painting[j][i];
          ctx.beginPath();
          ctx.arc(x, y, 12.5, 0, 2 * Math.PI);
          ctx.fill();
          x += 45;
          ctx.moveTo(x, y);
        }
        x = 12.5;
        y += 45;
      }
    }
  }

}]);
