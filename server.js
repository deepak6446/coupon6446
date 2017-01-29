var express = require('express');
var app =express();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//creates a live connection to database
mongoose.connect('mongodb://localhost/bogfall20161');
//to parse objects that we send using http request we use body parser
var bodyParser=require('body-parser');

//all static content are in public directry 
app.use(express.static(__dirname + '/public'));
// parse application/json 
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }))

//start subscription
var subSchema = mongoose.Schema({
    email : String,
    date : {type: Date,default: Date.now},
    page : String
},{collection:'subscription'});
var subModel=mongoose.model("subSchema",subSchema);
//end subscription
//for BLOG post
var PostSchema=mongoose.Schema({
	title: {type: String,required: true},
	body: String,
	tag:{type:String,enum : ['politics','economy']},
	post:{type: Date,default: Date.now}

},{collection:'post'});
var PostModel=mongoose.model("PostModel",PostSchema);
//end for BLOG POST
//login   
var signUpSchema=mongoose.Schema({
	email: String,
	firstName : String,
	lastame : String,
	password : String

},{collection:'signUp'});

var signUpModel=mongoose.model("signUpModel",signUpSchema);
//end login
//deal and slide upload
var dealSchema=mongoose.Schema({
	title: {type:String,required: true},
	Description : String,
	url : String,
	discount : String,
	client : String,
	subdiscount : String,
	product : String,
	image : String,
	date  : {type: Date,default:Date.now}

},{collection:'deal'});
var dealModel=mongoose.model("dealSchema",dealSchema);


var slideSchema=mongoose.Schema({
	url: {type:String,required: true},
	text : String,
	offertext : String,
	image : String	

},{collection:'slide'});
var slideModel=mongoose.model("slideSchema",slideSchema);

//end deal and slide upload
//subscription
app.post("/api/subemail",subemail);
//end subscription
//deal and slide model
app.post("/api/uploaddeal",uploaddeal);
app.post("/api/uploadslide",uploadslide);
//end deal and slide model
//start today offer
app.get("/api/gettodayoffers",todayoffers);
//end today offer
//get deal details start
app.get("/api/getclientoffers/:clidata",getAllOffers);
//get deal details end
//blog post
app.post("/api/blogpost",createpost);
app.get("/api/blogpost",getAllPosts);
app.delete("/api/blogpost/:id",deletePost);
app.get("/api/blogpost/:id",editPost);
app.put("/api/blogpost/:id",updatePost);
//end blog post
//login
app.post("/api/signUpPage",createSignUp);
app.get("/apt/loginaccount/:email",loginaccount);
//end login

//subcription
function subemail(req,res){
    var emailsub=req.body;
	console.log("in emailsubscription",emailsub.email);
	subModel
	       .create(emailsub)
	       .then(
	       		function(email){
	       			console.log("emailsubscription succ	");

	       		  },
	       		function(err){
	       			console.log("error subcription email");
	       		}

	       	);
}
//end subscription
//get deal details start
function todayoffers(req,res){

 console.log("in todayoffers");
 dealModel
		.find()
		.then(
			function(offers){
				console.log(offers);
				res.json(offers);
			},
			function(err){
				res.sendStatus(400);
			}   
			);
}
function getAllOffers(req,res){
	 var clidata=req.params.clidata;
     console.log("in getAllOffers" ,clidata);
	dealModel
		.find({client:clidata}).sort({date:-1})
		.then(
			function(offers){
				console.log(offers);
			   res.json(offers);
			},
			function(err){
				res.sendStatus(400);
			}   
			);
}
//end blog post

//deal and slide model
function uploaddeal(req,res){
	var deal =req.body;
	console.log(req.body);
	dealModel
    	.create(deal)
		.then(
			function(postobj){
				res.json(200);
			},
			function(error){
				console.log(error);
				res.sendStatus(400);
			}

		)
}

function uploadslide(req,res){
	var slide =req.body;
	console.log(req.body);
	slideModel
    	.create(slide)
		.then(
			function(postobj){
				res.json(200);
			},
			function(error){
				console.log(error);
				res.sendStatus(400);
			}

		)
}

//end deal and slide model

//login
function loginaccount(req,res){
	var email=req.params.email;
	console.log("createSignUp",email,"req.params",req.params,"req.body",req.body);

	signUpModel
	 	.find({email:email})
	 	.then(
	 		function(post){
	 			console.log("this datafound",post[0]);
	 			res.json(post[0]);
	 		},
	 		function(err){
	 			res.sendStatus(400);
	 			console.log("datanotfound");
	 		}

	 		)


}
function createSignUp(req,res){
    var signUp=req.body;
    signUpModel
    	.create(signUp)
		.then(
			function(postobj){
				res.json(200);
			},
			function(error){
				console.log(error);
				res.sendStatus(400);
			}

		)
	console.log("createSignUp",signUp,"req.params",req.params,"req.body",req.body);
}
//end login
function updatePost(req,res){
	var postId = req.params.id;
	var post=req.params.body;

    console.log(post.title);
    console.log(post.body)
	PostModel
		.update({_id:postId},{
			title: post.title,
			body: post.body
		})
		.then(
	 		function(status){
	 			res.sendStatus(200);
	 		},
	 		function(err){
	 			res.sendStatus(400);
	 		}

	 		)
}

function editPost(req,res){
	var postId=req.params.id;
	PostModel
	 	.findById(postId)
	 	.then(
	 		function(post){
	 			res.json(post);
	 		},
	 		function(err){
	 			res.sendStatus(400);
	 		}

	 		)

}

function deletePost(req,res){
		var postId=req.params.id;
		console.log("delet post");
	PostModel
		.remove({_id:postId})
		.then(
				function(status){
					res.sendStatus(200);
				},
				function(){
					res.sendStatus(400);
				}

			);

		
}

function getAllPosts(req,res){

	PostModel
		.find()
		.then(
			function(posts){
			   res.json(posts);
			},
			function(err){
				res.sendStatus(400);
			}   
			);

}


function createpost(req,res){

	var post = req.body;
	console.log(post);
	PostModel
		.create(post)
		.then(
			function(postobj){
				res.json(200);
			},
			function(error){
				res.sendStatus(400);
			}

		)

}
app.get('/*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
console.log("server is running");
app.listen(3000);