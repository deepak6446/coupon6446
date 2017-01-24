  angular
      .module("homepageapp",[])
      .controller("homepagecont",homepagecont);

      function homepagecont($scope,$http){

			$scope.getAllOffers=getAllOffers;

			function init(){
				

			}
			init();
			function getAllOffers(){
				$scope.$watch('client', function () {
	                    console.log($scope.client); 
                    
				    });
				$http	
	    			.get("/api/getclientoffers")
	    			.then(function(response) {
  						$scope.clients = response.data;
					})
                    .catch(function(response) {
  						console.error('Gists error', response.status, response.data);
					});
					
			}  
       }