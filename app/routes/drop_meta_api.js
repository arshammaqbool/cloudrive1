var Drop_Meta = require('../models/drop_meta');

var config = require('../../config');

var secretKey = config.secretKey;


module.exports = function(app, express){
  var drop_meta_api = express.Router();

  drop_meta_api.post('/dropdata', function(req, res){
    //console.log("le = "+req.decoded.username);
    var drop_data= new Drop_Meta({
      readonly: req.body.readonly,
      bytes: req.body.bytes,
      rev: req.body.rev,
      modified: req.body.modified,
      size: req.body.size,
      path: req.body.path,
      parent: req.body.parent,
      is_dir: req.body.is_dir,
      root: req.body.root,
      type: req.body.type,
      name: req.body.name,
      downloadlink: req.body.downloadlink,
      file: req.body.file,
      drop_id: req.body.drop_id
    });

    drop_data.save(function(err){
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
  drop_meta_api.post('/pick', function(req,res){
    console.log(req.body.allu);
    Drop_Meta.find({"drop_id": req.body.allu},function(err,dropling){

      if(err)
      {
        console.log(err);
        res.send(err);
        return;
      }
      //console.log(dropling);
      res.json(dropling);
    });
  });

  drop_meta_api.post('/findid', function(req,res){
    //console.log("In Id Api");
    console.log(req.body.parent);

    Drop_Meta.find({"parent": req.body.parent, "name": req.body.name},function(err,dropling){

      if(err)
      {
        res.send(err);
        return;
      }

      res.json(dropling);
    });
  });

  drop_meta_api.post('/findchild', function(req, res){
    Drop_Meta.find({"parent": req.body.parent, "drop_id": req.body.allu},function(err,dropling){

      if(err)
      {
        res.send(err);
        return;
      }

      res.json(dropling);
    });

  });

  return drop_meta_api;
}
