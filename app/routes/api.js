var User = require('../models/user');

var config = require('../../config');

var secretKey = config.secretKey;
var jsonwebtoken= require('jsonwebtoken');

function createToken(user){

  var token= jsonwebtoken.sign({
    _id: user._id,
    name: user.name,
    username: user.username
  }, secretKey, {
    expiresInMinute: 1440
  });

  return token;

}


module.exports = function(app, express){
  var api = express.Router();

   api.post('/signup', function(req, res){

     var user= new User({
       f_name: req.body.f_name,
       l_name: req.body.l_name,
       e_mail: req.body.e_mail,
       username: req.body.username,
       password: req.body.password
     });

    var token= createToken(user);
     user.save(function(err){
       if(err){
         res.send(err);
         return;
       }

       res.json({
         success: true,
         message : 'User has been created',
         token: token
       })
     });
   });

   api.get('/users', function(req,res){

     User.find({},function(err,users){

       if(err)
       {
         res.send(err);
         return;
       }

       res.json(users);
     });
   });

   api.post('/login', function(req,res){
     User.findOne({
       username: req.body.username
     }).select('f_name l_name username e_mail password').exec(function(err,user){
       if(err) throw err;

       if(!user){
         res.send({message:"User Doesnt Exist"});
       }else if (user) {
         var validPassword= user.comparePassword(req.body.password);

         if(!validPassword){
           res.send({message:"Invalid Password"});
         }else {
           {

             /////////token

             var token = createToken(user);
             var allu = req.body.username;

             res.json({
               success: true,
               allu: allu,
               token: token
               //allu: allu;
             });
           }
         }
       }
     });
   });

   api.use(function(req, res, next){

     console.log("someone just came to our app");

     var token = req.body.token || req.param('token') || req.headers['x-access-token'];

     //check if token exists
     if(token){
       jsonwebtoken.verify(token,secretKey, function(err,decoded){
         if(err){
           res.status(403).send({success: false, message: "Failed to Authenticate"});
         }
         else {

           req.decoded = decoded;
           next();
         }
       });

     }else {
       res.status(403).send({success: false, message: "No Token Provided"})
     }
   });

   //Dest B


   api.get('/',function(req,res){
     res.json("Hello Kaka");
   });

   api.get('/me', function(req,res){
     res.json(req.decoded);
   });

   return api;
}
