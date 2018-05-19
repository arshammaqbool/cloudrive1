var Combi_Log = require('../models/combi_log');

var config = require('../../config');

var secretKey = config.secretKey;

module.exports = function(app, express){
  var combi_log_api = express.Router();

  combi_log_api.post('/logdata', function(req, res){
    var log_data= new Combi_Log({
      name: req.body.name,
      size: req.body.size,
      modified: req.body.modified,
      path: req.body.path,
      parent: req.body.parent,
      is_dir: req.body.is_dir,
      type: req.body.type,
      downloadlink: req.body.downloadlink,
      upload_location: req.body.upload_location,
      log_id: req.body.log_id
    });
    log_data.save(function(err){
      if(err){
        console.log(err);
        res.send(err);
        return;
      }

      res.json({message : 'Data has been Entered'});
      console.log("Data is entered");
      //console.log(req.decoded.username);
    });
  });

  combi_log_api.get('/getalldata', function(req,res){

    Combi_Log.find({},function(err,logling){

      if(err)
      {
        res.send(err);
        console.log(err);
        return;
      }

      res.json(logling);
    });
  });
  return combi_log_api;
}
