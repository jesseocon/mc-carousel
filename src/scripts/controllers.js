(function(window, angular, undefined) {
  'use strict';

  angular
    .module('mcCarousel.controllers', [])
    .controller('TestController', ['$scope',
      function($scope) {
        let message = 'Hello world!';
        $scope.message = message;
      }
    ]);

})(window, window.angular);
