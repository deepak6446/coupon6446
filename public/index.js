
   angular
       .module('MyApp', [])
       .controller('subCtrl',subCtrl)
       .controller('MainCtrl',mainctrl);

 function mainctrl($scope,$http,$interval) {
        
        $scope.index = 0;
        $scope.todayoffers=todayoffers;
        $scope.images = [
          './Jabong.jpg',
          './Flipkart.png',
          './Myntra.jpg',
          './shopclues.jpg',
          './Amazon.png'
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

        }, 2000);
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

 }
  function subCtrl($scope,$http){
    $scope.subscribe=subscribe;

      function subscribe(scopesub){
          console.log("in subscribe",scopesub.email);
          $http
              .post("/api/subemail",scopesub);

      }



  }     
