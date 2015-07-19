(function(window, angular, undefined) {
  'use strict';

  angular
    .module('mcCarousel.directives', [
    ])
    .directive('mcCarousel', [ '$timeout', 'SlideContainerBridge', '$window',
      function($timeout, SlideContainerBridge, $window) {
        return {
          restrict: 'EA',
          transclude: true,
          scope: {},
          template: '<div class="mc-carousel">'+
                       '<button ng-click="moveSlides(\'right\')">right</button>'+
                       '<button ng-click="moveSlides(\'left\')">left</button>'+
                     '</div>'+
                     '<ng-transclude></ng-transclude>',
          link: function(scope, element) {
            scope.slideContainer = null;
            scope.moveSlides = moveSlides

            $window.onresize = function() {
              scope.slideContainer.positionSlides();
            };

            $timeout(function() {
              scope.slideContainer = new SlideContainerBridge({ topPadding: 100});
            }, 0, false)


            function moveSlides(dir) {
              scope.slideContainer.moveSlides(dir)
            }

          }
        };
      }
    ]);

})(window, window.angular);
