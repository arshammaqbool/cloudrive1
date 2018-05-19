var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();


mongoose.connect(config.database, function(err){
  if(err){
    console.log(err);
  }
  else {
    console.log("Connected to DB");
  }
});

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//html page index
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public'));
//include api's here
var api= require('./app/routes/api')(app, express);
app.use('/api',api);

var drop_meta_api= require('./app/routes/drop_meta_api')(app, express);
app.use('/drop_meta_api',drop_meta_api);

var one_meta_api= require('./app/routes/one_meta_api')(app, express);
app.use('/one_meta_api',one_meta_api);

var media_meta_api= require('./app/routes/media_meta_api')(app, express);
app.use('/media_meta_api',media_meta_api);

var google_meta_api= require('./app/routes/google_meta_api')(app, express);
app.use('/google_meta_api',google_meta_api);

var mega_meta_api= require('./app/routes/mega_meta_api')(app, express);
app.use('/mega_meta_api',mega_meta_api);

var cloud_info_api= require('./app/routes/cloud_info_api')(app, express);
app.use('/cloud_info_api',cloud_info_api);

var combi_log_api= require('./app/routes/combi_log_api')(app, express);
app.use('/combi_log_api',combi_log_api);


app.get('*', function(req,res){
  res.sendFile(__dirname + '/public/app/index.html');
});

app.listen(config.port, function(err){
  if(err){
    console.log(err);
  }
  else {
    console.log("Listening at port 8000");
  }
});
