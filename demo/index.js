'use strict';

angular
  .module('demoApp', [
    'mcCarousel'
  ])
  .controller('demoMainController', [ '$scope', '$timeout', function($scope, $timeout) {
    $scope.slides = [
      {id: 1, message: 'first slide'},
      {id: 2, message: 'second slide'},
      {id: 3, message: 'third slide'},
      {id: 4, message: 'fourth slide'},
      {id: 5, message: 'fifth slide'},
    ];
    $scope.currentSlideNo = 1;

    $scope.addSlide = function() {
      $scope.slides.push({id: 6, message: 'sixth slide'} );
      $timeout(function() {
        $scope.$broadcast('mc.slides.added');
      }, 0, false)
    }

    $scope.forward = function() {
      $scope.$broadcast('mc.slides.forward');
    };

    $scope.back = function() {
      $scope.$broadcast('mc.slides.back');
    };

    $scope.move = function(dir) {
      $scope.$broadcast('mc.slides.move', dir);
    };

    $scope.updateCurrentSlideNo = function(totalSlides, slideNo, currentSlideIndex) {
      $scope.currentSlideNo = slideNo;
    };

    $scope.isFirstSlide = function() {
      return $scope.currentSlideNo === 1;
    };

    $scope.isLastSlide = function() {
      return $scope.currentSlideNo === $scope.slides.length;
    };

  }]);
