var Mega_Meta = require('../models/mega_meta');

var config = require('../../config');

var secretKey = config.secretKey;


module.exports = function(app, express){

  var mega_meta_api = express.Router();

  mega_meta_api.post('/megadata', function(req, res){

    var mega_data = new Mega_Meta({
      node_id: req.body.node_id,
      parent_id: req.body.parent_id,
      name: req.body.name,
      size: req.body.size,
      is_dir: req.body.is_dir,
      type: req.body.type,
      modified: req.body.modified,
      mega_id: req.body.mega_id,
    });

    mega_data.save(function(err){
      if(err){
        res.send(err);
        console.log(err);
        return;
      }

      res.json({message : 'Data has been Entered'});
      console.log("Data is entered");
    });
  });

  mega_meta_api.post('/grab', function(req,res){

    Mega_Meta.find({"mega_id": req.body.allu},function(err,megling){

      if(err)
      {
        res.send(err);
        return;
      }

      res.json(megling);
    });
  });
  mega_meta_api.post('/findid', function(req,res){
    //console.log("In Id Api");

    Mega_Meta.find({"parent_id": req.body.parent, "name": req.body.name},function(err,megling){

      if(err)
      {
        res.send(err);
        return;
      }

      res.json(megling);
    });
  });

  mega_meta_api.post('/findchild', function(req, res){
    Mega_Meta.find({"parent_id": req.body.parent, "mega_id": req.body.allu},function(err,megling){

      if(err)
      {
        res.send(err);
        return;
      }

      res.json(megling);
    });

  });

  return mega_meta_api;
}
