var Cloud_Info = require('../models/cloud_info');

var config = require('../../config');

var secretKey = config.secretKey;


module.exports = function(app, express){

  var cloud_info_api = express.Router();

  cloud_info_api.post('/cloudinfo', function(req, res){

    var cloud_data= new Cloud_Info({
      user_id: req.body.user_id,
      cloud_name: req.body.cloud_name,
      e_mail: req.body.e_mail,
      password: req.body.password,
      total_space: req.body.total_space,
      remaining_space: req.body.remaining_space
    });

    cloud_data.save(function(err){
      if(err){
        res.send(err);
        console.log(err);
        return;
      }

      res.json({message : 'Data has been Entered'});
      console.log("Data is entered");
    });
  });

  cloud_info_api.post('/getuserinfo', function(req,res){

    Cloud_Info.find({"user_id": req.body.allu},function(err,cloudling){

      if(err)
      {
        res.send(err);
        return;
      }

      res.json(cloudling);
    });
  });

  cloud_info_api.post('/updateuser', function(req, res){
    console.log("API: "+req.body.total_space + req.body.remaining_space + req.body.cloud_name);

    Cloud_Info.update({"_id": req.body.cloudId},{$set:{'total_space': req.body.total_space, 'remaining_space':req.body.remaining_space}},function(err){
      if(err)
      {
        res.send(err);
        console.log(err);
        return;
      }
      console.log("Out of search No error");

    });
  });


  return cloud_info_api;

}
