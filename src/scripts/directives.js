(function(window, angular, undefined) {
  'use strict';

  angular
    .module('mcCarousel.directives', [
      'mcCarousel.controllers'
    ])
    .directive('testDirective', [
      function() {
        return {
          restrict: 'E',
          controller: 'TestController',
          scope: {},
          template: '<div class="mc-carousel">{{message}}</div>'
        };
      }
    ]);

})(window, window.angular);
