var Google_Meta = require('../models/google_meta');

var config = require('../../config');

var secretKey = config.secretKey;


module.exports = function(app, express){
  var google_meta_api = express.Router();

  google_meta_api.post('/googledata', function(req, res){

    var google_data= new Google_Meta({
      key: req.body.key,
      name: req.body.name,
      size: req.body.size,
      modified: req.body.modified,
      mime_type: req.body.mime_type,
      is_dir: req.body.is_dir,
      parent_id: req.body.parent_id,
      downloadlink: req.body.downloadlink,
      google_id: req.body.google_id
    });

    google_data.save(function(err){
      if(err){
        console.log(err);
        res.send(err);
        return;
      }

      res.json({message : 'Data has been Entered'});
      console.log("Data is entered");

    });

  });

  google_meta_api.post('/hunt', function(req,res){

    Google_Meta.find({"google_id": req.body.allu},function(err,gogling){

      if(err)
      {
        res.send(err);
        return;
      }

      res.json(gogling);
    });
  });
  google_meta_api.post('/findid', function(req,res){
    //console.log("In Id Api");

    Google_Meta.find({"parent_id": req.body.parent, "name": req.body.name},function(err,gogling){

      if(err)
      {
        res.send(err);
        return;
      }

      res.json(gogling);
    });
  });
  google_meta_api.post('/findchild', function(req, res){
    Google_Meta.find({"parent_id": req.body.parent, "google_id": req.body.allu},function(err,gogling){

      if(err)
      {
        res.send(err);
        return;
      }

      res.json(gogling);
    });

  });

  return google_meta_api;

}
