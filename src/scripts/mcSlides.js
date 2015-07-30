(function(window, angular, undefined) {
  'use strict';

  angular
    .module('mcSlides', [
    ])
    .directive('mcSlides', [ '$timeout', 'SlideContainerBridge', '$window',
      function($timeout, SlideContainerBridge, $window) {
        return {
          restrict: 'EA',
          transclude: true,
          scope: {
            buttons: '=',
            afterMove: '&onAfterMove'
          },
          template: '<div class="mc-carousel">'+
                       '<button ng-click="moveSlides(\'right\')" ng-if="buttons">right</button>'+
                       '<button ng-click="moveSlides(\'left\')" ng-if="buttons">left</button>'+
                     '</div>'+
                     '<ng-transclude></ng-transclude>',
          link: function(scope, element) {
            var afterMoveHandler;
            scope.slideContainer = null;
            scope.moveSlides = moveSlides;
            console.log('this is this: ', this);

            function moveSlides(dir, callback) {
              scope.slideContainer.moveSlides(dir, callback)
            }

            function afterMoveHandler(totalSlides, currentSlideNumber, currentSlideIndex) {
              scope.afterMove({totalSlides: totalSlides, currentSlideNo: currentSlideNumber, currentSlideIndex: currentSlideIndex});
            };

            scope.$on('mc.slides.forward', function(e, args) {
              scope.moveSlides('right', afterMoveHandler);
            });

            scope.$on('mc.slides.back', function(e, args){
              scope.moveSlides('left', afterMoveHandler);
            });

            scope.$on('mc.slides.move', function(e, dir) {
              scope.moveSlides(dir, afterMoveHandler);
            });

            scope.$on('mc.slides.added', function(e, args) {
              //scope.slideContainer.refresh();
              scope.slideContainer.addSlides();
            });

            $window.onresize = function() {
              scope.slideContainer.positionSlides();
            };

            $timeout(function() {
              scope.slideContainer = new SlideContainerBridge({ topPadding: 100});
            }, 0, false);

          }
        };
      }
    ]);

})(window, window.angular);
