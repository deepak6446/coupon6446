
   angular
       .module('MyApp', [])
       .controller('MainCtrl', function($scope,$http,$interval) {
  
  $scope.index = 0;
  $scope.todayoffers=todayoffers;
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
  function todayoffers(){
    console.log("in todayoffers");
      
      $http
          .get("/api/gettodayoffers")
          .then(function(response){
              $scope.offers=response.data;
            })
          .catch(function(response){
              console.log("error in todayoffers");           
           });
  }

});
