(function(window, angular, undefined) {
  'use strict';
  angular.module('slideBridge', ['slideBridge'])
    .factory('SlideBridge', [
      function() {
        var SlideBridge;
        return SlideBridge = (function(){
          function SlideBridge(options) {
            options = options || {};
            this.elem = options.elem;
          }

          SlideBridge.prototype.getBoundingProp = function(prop) {
            var allowedProps = ['left', 'right', 'top', 'bottom', 'width', 'height'];
            if (allowedProps.indexOf(prop) < 0) {
              throw new Error('Must be a property of element.getBoundingClientRect');
            }
            return this.elem.getBoundingClientRect()[prop];
          };

          SlideBridge.prototype.setElemProp = function(name, value) {
            if (typeof name === 'string') {
              this.elem.style[name] = value
            } else if (typeof name === 'object') {
              for( var prop of name) {
                this.elem.style[prop] = name[prop];
              }
            }
            return this;
          };

          return SlideBridge
        })();
      }
    ]);

})(window, window.angular);
