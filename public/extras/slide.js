
angular.module('MyApp', [])
.controller('MainCtrl', function($scope,$interval) {
  
  $scope.index = 0;
  
  $scope.images = [
    './Amazon.png',
    './Flipkart.png',
    './Myntra.jpg',
    './shopclues.jpg',
    './Snapdeal.jpg'
  ];
  $interval(function () {
      if($scope.index >= ($scope.images.length-1))
      {
          $scope.index=0;
      }
      else
      {
          $scope.index=$scope.index+1;
      }

  }, 5000);
});
