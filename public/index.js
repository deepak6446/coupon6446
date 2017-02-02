
   angular
       .module('MyApp', ["ngRoute"])
       .controller('subCtrl',subCtrl)
       .controller('MainCtrl',mainctrl)
       .controller("homepagecont",homepagecont)
       .controller("bodycontroller",bodycontroller)
       .controller("loginController",loginController)
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
                  .when("/search",{
                      templateUrl:"./search.html"
                  })
                  .when("/signup",{
                      templateUrl:"signup.html",
                      controller:"loginController"
                  })
                  .otherwise({
                      redirectTo: "/"
                  })

                  $locationProvider.html5Mode(true);

       });

  function bodycontroller($scope,$http){
        

        function init(){
            $scope.cli="Amazon";      
        }
        init();

        $scope.callcli=callcli;
        $scope.searchoffers=searchoffers;

        function callcli(data){
          //console.log("in callcli", data);
          $scope.cli=data;
        } 
        function searchoffers(text){
            $http
                .get("/api/getsearchoffers/"+text)
                .then(function(res){
                    $scope.offers=res.data;
                })
                .catch(function(res){
                  console.error('searchoffers error',res.status,res.data);
                });

          console.log("in searchoffers",text);
        } 
       
  }
  
  function loginController($scope,$http){

      function init(){

      loginshow='true';
      alertshow='false'
       }
       init();
    $scope.login=login;
    $scope.signin=signin;
    $scope.signup=signup;
    $scope.loginshow=loginshow;
    $scope.loginaccount=loginaccount;
    

    function loginaccount(scopeemail){
      console.log("befor loginaccount : ",scopeemail);
      $http
        .get("/apt/loginaccount/"+scopeemail)
        .success(function(sc1ope){
          //var add=JSON.parse("sc1ope");
          //$scope.scopedata=sc1ope;
                    if($scope.scopedata.email == sc1ope.email && $scope.scopedata.password == sc1ope.password)
                    {
                      window.location.assign("./index.html")
                    }
                    else
                    {
                      $scope.alertshow=true;
                    }
        });
      console.log("loginaccount : ",scopeemail);
    }

    function signin(){
      console.log("in signin function");
      $scope.loginshow=true;  
    }
    function login(){
      console.log("in login function");
      $scope.loginshow=false; 
    }
    function signup(scopedata){
      $http.post("/api/signUpPage",scopedata)
      .success(function(sc1ope){
          var add=JSON.parse(sc1ope);
          if (add == 200)
          {
            window.location.assign("./index.html")
          }
            });        
      console.log("in signup function");
      console.log(scopedata);
    }
  }


  function homepagecont($scope,$http){

      $scope.getAllOffers=getAllOffers;
     
      function getAllOffers(clidata){
        //console.log("clidata",clidata);
          
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
        $scope.indexcheck=indexcheck;

        function makeindexfalse(){
             $scope.in0 = false;
             $scope.in1 = false;
             $scope.in2 = false;
             $scope.in3 = false;
             $scope.in4 = false;
        }
        $interval(function () {

            if($scope.index >= 4)
            {
                makeindexfalse();
                $scope.index=0;
                $scope.in0 = true;
            }
            else
            {
                $scope.index=$scope.index+1 ;
                indexcheck();
                
            }
        }, 2000);

        function indexcheck(){
                makeindexfalse();
                if($scope.index==0)
                {
                   $scope.in0 = true;     
                }
                else if($scope.index==1)
                {
                   $scope.in1 = true;     
                }
                else if($scope.index==2)
                {
                   $scope.in2 = true;     
                }
                else if($scope.index==3)
                {
                   $scope.in3 = true;     
                }
                else if($scope.index==4)
                {
                   $scope.in4 = true;     
                }

        }
        function todayoffers(){
          //console.log("in todayoffers");
            
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
