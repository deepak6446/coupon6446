(function(){
	angular
		.module("BlogApp",[])
		.controller("BlogController",BlogController);

	function BlogController($scope,$http){

		$scope.createPost = createPost;
		$scope.deletePost = deletePost;
		$scope.editPost = editPost;
		$scope.updatePost = updatePost;

   		function inti(){

   			getallpost();
   		}
   		inti();

   		function updatePost(postId){
   			$http
   				.put("/api/blogpost/"+postId._id)

   		}

   		function editPost(postId){
   			$http
   				.get("/api/blogpost/"+postId)
   				.success(function(post){
   					$scope.post=post;
   				});

   		}
		function getallpost(){
			$http	
    			.get("/api/blogpost")
				.success(function(posts){
						$scope.posts=posts;
						console.log("getall",posts);
				});
		}

		function createPost(post){

			console.log(post);
			$http
				.post("/api/blogpost",post)
				.success(getallpost);
		}

		function deletePost(postId){
			console.log("deletepost");
			$http
				.delete("/api/blogpost/"+postId)
				.success(getallpost);
		}
	}	
})();