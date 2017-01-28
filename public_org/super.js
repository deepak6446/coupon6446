angular
	.module("superapp",[])
	.controller("superController",superController);

	function superController($scope,$http){

   		 $scope.uploaddeal=uploaddeal;
   		 $scope.uploadslide=uploadslide;
   		
        function init(){
 			

        }
        init();
   		function uploaddeal(scopedeal){
			$http.post("/api/uploaddeal",scopedeal)
			.success(function(sc1ope){
					var add=JSON.parse(sc1ope);
					if (add == 200)
					{
						window.location.assign("./super.html");
						console.log("upload data of deal successful");
					}
            });        
			console.log("in scopedeal function");
			console.log(scopedeal);
		}

   		function uploadslide(scopedeal){
			$http.post("/api/uploadslide",scopedeal)
			.success(function(sc1ope){
					var add=JSON.parse(sc1ope);
					if (add == 200)
					{
						window.location.assign("./super.html");
						console.log("upload data of slides successful");
					}
            });        
			console.log("in scopedeal function");
			console.log(scopedeal);
		}


    }	

