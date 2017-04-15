var express = require('express');
var app =express();
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
// Promise are used for mongoose asynchronous operations line save().then()
mongoose.Promise = global.Promise;
//creates a live connection to database
mongoose.connect('mongodb://localhost/bogfall20161');
//to parse objects that we send using http request we use body parser
var bodyParser=require('body-parser');
//upload files
var multer = require('multer');
/*app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
});*/
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './public/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();

            console.log(file);
            cb(null, file.originalname)
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');
    /** API path that will upload the files */
    app.post('/upload', function(req, res) {
    	console.log("in upload");
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 console.log(err);
                 return;
            }
             res.json({error_code:0,err_desc:null});
        })
    });
//end upload files
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
app.get("/api/getalloffers",getlistoffers);
//get deal details end
//search offers
app.get("/api/getsearchoffers/:text",searchoffers);
//end search offers
app.delete("/api/deleteoffer/:id",deleteoffer);
//login
app.post("/api/signUpPage",createSignUp);
app.get("/apt/loginaccount/:email",loginaccount);
//start forget password
app.get("/api/forgetpass/:email",forgetpassword);
//start forget password
//end login
function deleteoffer(req,res){
	var id=req.params.id;
	console.log(id);
	dealModel
		.remove({_id:id})
		.then(function(data){
			res.sendStatus(200);
		},function(error){
			res.sendStatus(400);
		});
}
//forgetpassword
function forgetpassword(req,res){
	var email=req.params.email;
	var subject='Jugaaddeal password recovery';
	var text='Your Jugaaddeal Password is :';
	signUpModel
	 	.find({email:email})
	 	.then(
	 		function(data){
	 			text=text+data[0].password;
	 			sendmail(data[0].email,subject,text);
	 			res.sendStatus(200);
	 		},
	 		function(err){
	 			res.sendStatus(400);
	 			console.log("datanotfound");
	 		}

	 		)

}
//end forgetpassword
function sendmail(toaddress,subject,text){
	var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'deepak547583@gmail.com', // Your email id
            pass: '' // Your password
        }
    });
    var mailOptions = {
    from: 'deepak547583@gmail.com', // sender address
    to: toaddress, // list of receivers
    subject: subject, // Subject line
    text: text //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };
    transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    };
    });

}
function subemail(req,res){
    var emailsub=req.body;
    var subject="Jugaaddeal.com subscription";
    var text="You have successfully subscribed to Jugaaddeal.com";
	console.log("in emailsubscription",emailsub.email);
	sendmail(emailsub.email,subject,text);
	subModel
	       .create(emailsub)
	       .then(
	       		function(email){
	       			//console.log("emailsubscription succ	");
	       			res.sendStatus(200);

	       		  },
	       		function(err){
	       			//console.log("error subcription email");
	       			res.sendStatus(400);
	       		}

	       	);
}
//end subscription
//get deal details start
function todayoffers(req,res){

 //console.log("in todayoffers");
 dealModel
		.find().sort({date:-1}).limit(12)
		.then(
			function(offers){
				//console.log(offers);
				res.json(offers);
			},
			function(err){
				res.sendStatus(400);
			}   
			);
}
function getlistoffers(req,res){
	dealModel
		.find().sort({date:-1})
		.then(
			function(offers){
				res.json(offers);
			},
			function(err){
				res.sendStatus(400);
			});
}
function getAllOffers(req,res){
	 var clidata=req.params.clidata;
     console.log("in getAllOffers" ,clidata);
	dealModel
		.find({client:clidata}).sort({date:-1})
		.then(
			function(offers){
				//console.log(offers);
			   res.json(offers);
			},
			function(err){
				res.sendStatus(400);
			}   
			);
}
//end blog post
//search all  offers
 function searchoffers(req,res){
 	var locate=req.params.text;
 	console.log(locate);
    dealModel
        .find({$text:{$search:locate}},{score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}}).limit(20)
        .then(
        	function(offers){
        		res.json(offers);
 		        console.log(offers);

        	},
        	function(err){
        		//console.log(err);
        		res.sendStatus(400);
        	}
        );

 }
//end search all  offers
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
/*app.get('/*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});*/
console.log("server is running");
app.listen(3000,function(){
	console.log("server running on localhost:3000");
});