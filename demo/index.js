'use strict';

angular
  .module('demoApp', [
    'mcCarousel'
  ])
  .controller('demoMainController', [ '$scope', function($scope) {
    $scope.slides = [
      {id: 1, message: 'first slide'},
      {id: 2, message: 'second slide'},
      {id: 3, message: 'third slide'},
      {id: 4, message: 'fourth slide'},
      {id: 5, message: 'fifth slide'},
    ];

  }]);



