(function(window, angular, undefined) {
  'use strict';
  angular.module('slideContainerBridge', ['slideBridge'])
    .factory('SlideContainerBridge', [
      'SlideBridge',
      function(SlideBridge) {
        var SlideContainerBridge;
        return SlideContainerBridge = (function() {
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
              slideTransition: 'all 0.5s ease 0s',
            };
            this.mergeProps(this, defaults, options)
            this.advanceButton = document.getElementById(this.advanceButtonSelector);
            this.retreatButton = document.getElementById(this.retreatButtonSelector);
            this.init();
          }


          SlideContainerBridge.prototype.init = function() {
            this.initializeSlides()
              .initializeSlideContainerEl()
              .positionSlides()
              .bindEvents();
            return this;
          };

          SlideContainerBridge.prototype.mergeProps = function() {
            var args = Array.prototype.slice.call(arguments), i, base;
            base = args.shift();
            for(i = 0; i < args.length; ++i) {
              var _obj = args[i];
              for ( var prop in _obj) {
                base[prop] = _obj[prop];
              }
            }
            return this;
          };

          SlideContainerBridge.prototype.initializeSlides = function() {
            var _slides = document.getElementsByClassName(this.slideSelector), i;
            for (i = 0; i < _slides.length; ++i) {
              var _slide = _slides[i];
              var _slideInstance = new SlideBridge({ elem: _slide });
              _slideInstance
                .setElemProp('transition', this.slideTransition)
                .setElemProp('top', this.topPadding + 'px')
                .setElemProp('width', this.width + 'px');
              this.slides.push(_slideInstance);
            }
            return this;
          };

          SlideContainerBridge.prototype.bindEvents = function() {
            var _slideContainerBridge = this;
            if (this.advanceButton) {
              this.advanceButton.addEventListener('click', function() {
                _slideContainerBridge.moveSlides('right');
              });
            }

            if (this.retreatButton) {
              this.retreatButton.addEventListener('click', function() {
                _slideContainerBridge.moveSlides('left');
              });
            }

          };

          SlideContainerBridge.prototype.initializeSlideContainerEl = function() {
            this.elem = document.getElementById(this.slideContainerSelector);
            this.elem.style.height = this.getContainerHeight() + 'px';
            return this;
          };

          SlideContainerBridge.prototype.getContainerHeight = function() {
            return (this.slides[0].getBoundingProp('height') + this.topPadding + this.bottomPadding)
          };

          SlideContainerBridge.prototype.windowWidth = function() {
            return window.innerWidth || document.body.clientWidth;
          };

          SlideContainerBridge.prototype.windowCenter = function() {
            return this.windowWidth() / 2;
          };

          SlideContainerBridge.prototype.getCounterOffset = function(slideIndex) {
            return this.windowWidth() * slideIndex;
          };

          SlideContainerBridge.prototype.getPanelWidth = function(slideIndex) {
            return this.windowWidth() * slideIndex;
          }

          SlideContainerBridge.prototype.getLeftPositionForCentered = function() {
            return this.windowCenter() - (this.slideWidth / 2)
          };

          SlideContainerBridge.prototype.getSlideLeftPosition = function(_index) {
            return (this.getLeftPositionForCentered() + this.getPanelWidth(_index)) - this.getCounterOffset(this.slideCounter);
          }

          SlideContainerBridge.prototype.positionSlide = function(_index, _slide) {
            _slide.setElemProp('left', this.getSlideLeftPosition(_index) + 'px')
            return this;
          };

          SlideContainerBridge.prototype.positionSlides = function() {
            var i;
            for(i = 0; i < this.slides.length; ++i) {
              var _slide = this.slides[i];
              this.positionSlide(i, _slide);
            }
            return this;
          };

          SlideContainerBridge.prototype.moveSlides = function(dir) {
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
            return this;
          };

          return SlideContainerBridge;
        })();
      }
    ]);
})(window, window.angular);
