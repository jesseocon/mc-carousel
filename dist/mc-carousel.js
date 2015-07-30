/**
 * mc-carousel v0.1.0 ()
 * Copyright 2015 Jesse Ocon
 * Licensed under MIT
 */
'use strict';

(function (window, angular, undefined) {
  'use strict';
  angular.module('slideBridge', ['slideBridge']).factory('SlideBridge', [function () {
    var SlideBridge;
    return SlideBridge = (function () {
      function SlideBridge(options) {
        options = options || {};
        this.elem = options.elem;
      }

      SlideBridge.prototype.getBoundingProp = function (prop) {
        var allowedProps = ['left', 'right', 'top', 'bottom', 'width', 'height'];
        if (allowedProps.indexOf(prop) < 0) {
          throw new Error('Must be a property of element.getBoundingClientRect');
        }
        return this.elem.getBoundingClientRect()[prop];
      };

      SlideBridge.prototype.setElemProp = function (name, value) {
        if (typeof name === 'string') {
          this.elem.style[name] = value;
        } else if (typeof name === 'object') {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = name[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var prop = _step.value;

              this.elem.style[prop] = name[prop];
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
        return this;
      };

      return SlideBridge;
    })();
  }]);
})(window, window.angular);
'use strict';

(function (window, angular, undefined) {
  'use strict';
  angular.module('slideContainerBridge', ['slideBridge']).factory('SlideContainerBridge', ['SlideBridge', function (SlideBridge) {
    var SlideContainerBridge;
    return SlideContainerBridge = (function () {
      function SlideContainerBridge(options) {
        options = options || {};
        this.slides = [];
        this.slideCounter = 0;
        var defaults = {
          topPadding: 100,
          bottomPadding: 100,
          slideWidth: 500,
          slideContainerSelector: 'slide-container',
          slideSelector: 'slide',
          advanceButtonSelector: 'advance-button',
          retreatButtonSelector: 'retreat-button',
          slideTransition: 'left 0.5s ease 0s'
        };
        this.mergeProps(this, defaults, options);
        this.advanceButton = document.getElementById(this.advanceButtonSelector);
        this.retreatButton = document.getElementById(this.retreatButtonSelector);
        this.init();
      }

      SlideContainerBridge.prototype.init = function () {
        this.initializeSlides().initializeSlideContainerEl().positionSlides().bindEvents();
        return this;
      };

      SlideContainerBridge.prototype.refresh = function () {
        this.slides.splice(0);
        this.initializeSlides().initializeSlideContainerEl().positionSlides();
        return this;
      };
      SlideContainerBridge.prototype.totalSlides = function () {
        return this.slides.length;
      };

      SlideContainerBridge.prototype.addSlides = function () {
        this.initializeSlides(this.totalSlides()).positionSlides();
      };

      SlideContainerBridge.prototype.mergeProps = function () {
        var args = Array.prototype.slice.call(arguments),
            i,
            base;
        base = args.shift();
        for (i = 0; i < args.length; ++i) {
          var _obj = args[i];
          for (var prop in _obj) {
            base[prop] = _obj[prop];
          }
        }
        return this;
      };

      SlideContainerBridge.prototype.getSlideEls = function () {
        return document.getElementsByClassName(this.slideSelector);
      };

      SlideContainerBridge.prototype.initializeSlides = function (index) {
        var _slides = this.getSlideEls(),
            i,
            j;
        if (index) {
          j = index;
        } else {
          j = 0;
        }

        for (i = j; i < _slides.length; ++i) {
          var _slide = _slides[i];
          var _slideInstance = new SlideBridge({ elem: _slide });
          _slideInstance.setElemProp('transition', this.slideTransition).setElemProp('top', this.topPadding + 'px').setElemProp('width', this.width + 'px');
          this.slides.push(_slideInstance);
        }
        return this;
      };

      SlideContainerBridge.prototype.bindEvents = function () {
        var _slideContainerBridge = this;
        if (this.advanceButton) {
          this.advanceButton.addEventListener('click', function () {
            _slideContainerBridge.moveSlides('right');
          });
        }

        if (this.retreatButton) {
          this.retreatButton.addEventListener('click', function () {
            _slideContainerBridge.moveSlides('left');
          });
        }
      };

      SlideContainerBridge.prototype.initializeSlideContainerEl = function () {
        this.elem = document.getElementById(this.slideContainerSelector);
        this.elem.style.height = this.getContainerHeight() + 'px';
        return this;
      };

      SlideContainerBridge.prototype.getContainerHeight = function () {
        return this.slides[0].getBoundingProp('height') + this.topPadding + this.bottomPadding;
      };

      SlideContainerBridge.prototype.windowWidth = function () {
        return window.innerWidth || document.body.clientWidth;
      };

      SlideContainerBridge.prototype.windowCenter = function () {
        return this.windowWidth() / 2;
      };

      SlideContainerBridge.prototype.getCounterOffset = function (slideIndex) {
        return this.windowWidth() * slideIndex;
      };

      SlideContainerBridge.prototype.getPanelWidth = function (slideIndex) {
        return this.windowWidth() * slideIndex;
      };

      SlideContainerBridge.prototype.getLeftPositionForCentered = function () {
        return this.windowCenter() - this.slides[0].getBoundingProp('width') / 2;
      };

      SlideContainerBridge.prototype.getSlideLeftPosition = function (_index) {
        return this.getLeftPositionForCentered() + this.getPanelWidth(_index) - this.getCounterOffset(this.slideCounter);
      };

      SlideContainerBridge.prototype.positionSlide = function (_index, _slide) {
        _slide.setElemProp('left', this.getSlideLeftPosition(_index) + 'px');
        return this;
      };

      SlideContainerBridge.prototype.positionSlides = function () {
        var i;
        for (i = 0; i < this.slides.length; ++i) {
          var _slide = this.slides[i];
          this.positionSlide(i, _slide);
        }
        return this;
      };

      SlideContainerBridge.prototype.moveSlides = function (dir, callback) {
        if (dir === 'left') {
          this.slideCounter--;
        } else {
          this.slideCounter++;
        }

        if (this.slideCounter >= this.slides.length) {
          this.slideCounter = 0;
        } else if (this.slideCounter < 0) {
          this.slideCounter = this.slides.length - 1;
        }
        this.positionSlides();

        if (callback && typeof callback === 'function') {
          var totalSlides = this.slides.length,
              currentSlideNumber = this.slideCounter + 1,
              currentSlideIndex = this.slideCounter;
          callback(totalSlides, currentSlideNumber, currentSlideIndex);
        }
        return this;
      };

      return SlideContainerBridge;
    })();
  }]);
})(window, window.angular);
'use strict';

(function (window, angular, undefined) {
  'use strict';
  angular.module('mcCarouselSettings', []).provider('mcCarouselSettings', function () {
    var _defaults = {
      containerClass: 'mc-carousel-slide-container',
      slideClass: 'mc-carousel-slide'
    },
        _settings,
        getSettings = function getSettings() {
      if (!_settings) {
        _settings = angular.copy(_defaults);
      };

      return _settings;
    };

    this.set = function (prop, value) {
      var s = getSettings();
      if (angular.isObject(prop)) {
        angular.extend(s, prop);
      } else {
        s[prop] = value;
      }
      return this;
    };

    this.$get = getSettings;

    return this;
  });
})(window, window.angular);
'use strict';

(function (window, angular, undefined) {
  'use strict';

  angular.module('mcSlides', []).directive('mcSlides', ['$timeout', 'SlideContainerBridge', '$window', function ($timeout, SlideContainerBridge, $window) {
    return {
      restrict: 'EA',
      transclude: true,
      scope: {
        buttons: '=',
        afterMove: '&onAfterMove'
      },
      template: '<div class="mc-carousel">' + '<button ng-click="moveSlides(\'right\')" ng-if="buttons">right</button>' + '<button ng-click="moveSlides(\'left\')" ng-if="buttons">left</button>' + '</div>' + '<ng-transclude></ng-transclude>',
      link: function link(scope, element) {
        var afterMoveHandler;
        scope.slideContainer = null;
        scope.moveSlides = moveSlides;
        console.log('this is this: ', this);

        function moveSlides(dir, callback) {
          scope.slideContainer.moveSlides(dir, callback);
        }

        function afterMoveHandler(totalSlides, currentSlideNumber, currentSlideIndex) {
          scope.afterMove({ totalSlides: totalSlides, currentSlideNo: currentSlideNumber, currentSlideIndex: currentSlideIndex });
        };

        scope.$on('mc.slides.forward', function (e, args) {
          scope.moveSlides('right', afterMoveHandler);
        });

        scope.$on('mc.slides.back', function (e, args) {
          scope.moveSlides('left', afterMoveHandler);
        });

        scope.$on('mc.slides.move', function (e, dir) {
          scope.moveSlides(dir, afterMoveHandler);
        });

        scope.$on('mc.slides.added', function (e, args) {
          //scope.slideContainer.refresh();
          scope.slideContainer.addSlides();
        });

        $window.onresize = function () {
          scope.slideContainer.positionSlides();
        };

        $timeout(function () {
          scope.slideContainer = new SlideContainerBridge({ topPadding: 100 });
        }, 0, false);
      }
    };
  }]);
})(window, window.angular);
'use strict';

(function (window, angular, undefined) {
  'use strict';

  angular.module('mcCarousel', ['mcSlides', 'slideBridge', 'slideContainerBridge']);
})(window, window.angular);