
var express = require('express');
var app =express();
var nodemailer = require('nodemailer');
var bodyParser=require('body-parser');
app.use(express.static(__dirname + '/public'));
// parse application/json 
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }))
var router = express.Router();
//app.use('/sayHello', router);
//router.post('/', handleSayHello); // handle the route at yourdomain.com/sayHello
app.get('/dee',function(req, res) {
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'deepak.r.poojari@gmail.com', // Your email id
            pass: '966deepu@fb' // Your password
        }
    });
    var text = 'Hello world from \n\n' + req.body.name;
    var mailOptions = {
    from: 'deepak.r.poojari@gmail.com', // sender address
    to: 'deepak.r.poojari@gmail.com', // list of receivers
    subject: 'Email Example', // Subject line
    text: text //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };
    transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
    });
});
console.log("server mail is running");
app.listen(3000);