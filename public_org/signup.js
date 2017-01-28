	angular
		.module("loginApp",[])
		.controller("loginController",loginController);

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

   



