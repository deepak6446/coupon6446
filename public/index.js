
   angular
       .module('MyApp', ["ngRoute"])
       .controller('subCtrl',subCtrl)
       .controller('MainCtrl',mainctrl)
       .controller("homepagecont",homepagecont)
       .controller("bodycontroller",bodycontroller)
       .config(function ($routeProvider,$locationProvider){
                $routeProvider
                  .when("/",{
                      templateUrl:"./index1.html",
                      controller:"MainCtrl"

                  })
                  .when("/offers",{
                      templateUrl:"./amazonhome2.html",
                      controller: "homepagecont"
                  })
                  .otherwise({
                      redirectTo: "/"
                  })

                  $locationProvider.html5Mode(true);

       });

  function bodycontroller($scope){
        

        function init(){
            $scope.cli="Amazon";      
          }
          init();
          $scope.callcli=callcli;

        function callcli(data){
          console.log("in callcli", data);
          $scope.cli=data;

        }  
       
  }
  function homepagecont($scope,$http){

      $scope.getAllOffers=getAllOffers;

      
      function getAllOffers(clidata){
        
                      console.log("clidata",clidata);
          
        $http 
            .get("/api/getclientoffers/"+clidata)
            .then(function(response) {
              $scope.clients = response.data;
          })
                    .catch(function(response) {
              console.error('Gists error', response.status, response.data);
          });
          
      }  
       }     

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
