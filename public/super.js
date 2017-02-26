angular
	.module("superapp",["ngRoute"])
	.controller("superController",superController)

	function superController($scope,$http){

   		function init(){
 		  $scope.showdeal=true;	
        }
   		 $scope.uploaddeal=uploaddeal;
   		 $scope.uploadslide=uploadslide;
   		 $scope.getalloffers=getalloffers;
   		 $scope.removedeal=function(id){
   		 	console.log("in remove ",id);
   		 	$http
   		 		.delete("/api/deleteoffer/"+id)
   		 		.then(function(response){
   		 			console.log(response);
   		 			if(response.status == 200){
   		 				alert("offer deleted successfully")
   		 			}
   		 			else{
   		 				alert("error removing data");
   		 			}
   		 		},function(error){
   		 			console.log(error);
   		 		});
   		 }
   		 $scope.showdeals=function(){
   		 	console.log("showdeals()");
   		 	console.log("in getalloffers");
        	$http
        		.get("/api/getalloffers")
        		.then(function(response){
        				//console.log(response.data);
        				$scope.data=response.data;
        				/*for (x in response.data){
        					console.log(response.data[x]);
        				}
 */       				
        		},
        		function(error){

        	});
   		 	$scope.showdeal=!$scope.showdeal;
   		 }
   		 $scope.showslides=function(){
   		 	console.log("showslides()");
        	$scope.showdeal=!$scope.showdeal;
   		 }
        
        init();

        function getalloffers(){
        	console.log("in getalloffers");
        	$http
        		.get("/api/getalloffers")
        		.then(function(response){
        				console.log(response.data);
        				for (x in response.data){
        					console.log(response.data[x]);
        				}
        				
        		},
        		function(error){

        		});
        }
   		function uploaddeal(scopedeal){
			$http.post("/api/uploaddeal",scopedeal)
			.success(function(sc1ope){
					var add=JSON.parse(sc1ope);
					if (add == 200){
						alert("data uploaded successfully");
						window.location.assign("./super.html");
						/*console.log("upload data of deal successful");*/
					}
					else{
						alert("error uploading data");
					}
            });        
			/*console.log("in scopedeal function");
			console.log(scopedeal);*/
		}

   		function uploadslide(scopedeal){
			$http.post("/api/uploadslide",scopedeal)
			.success(function(sc1ope){
					var add=JSON.parse(sc1ope);
					if (add == 200){
						alert("data uploaded successfully");
						window.location.assign("./super.html");
						/*console.log("upload data of slides successful");*/
					}
					else{
						alert("error uploading data");
					}
            });        
			/*console.log("in scopedeal function");*/
			/*console.log(scopedeal);*/
		}


    }	

