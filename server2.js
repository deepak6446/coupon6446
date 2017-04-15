
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
            user: 'deepak547583@gmail.com', // Your email id
            pass: '' // Your password
        }
    });
    var text = 'http://javascript.tutorialhorizon.com/2015/07/02/send-email-node-js-express/\n\n' + req.body.name;
    var mailOptions = {
    from: 'deepak547583@gmail.com', // sender address
    to: 'mohitbhartiya153@gmail.com', // list of receivers
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