(function(window, angular, undefined) {
  'use strict';
  angular.module('mcCarouselSettings', [])
    .provider('mcCarouselSettings', function() {
      var _defaults = {
        containerClass: 'mc-carousel-slide-container',
        slideClass: 'mc-carousel-slide'
      }
         , _settings
         , getSettings = function() {
           if(!_settings) {
             _settings = angular.copy(_defaults);
           };

           return _settings;
         };

      this.set = function(prop, value) {
        var s = getSettings();
        if (angular.isObject(prop)) {
          angular.extend(s, prop);
        } else {
          s[prop] = value;
        }
        return this;
      }

      this.$get = getSettings;

      return this;
    });

})(window, window.angular);
