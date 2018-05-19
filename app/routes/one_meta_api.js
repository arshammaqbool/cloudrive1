var One_Meta = require('../models/one_meta');

var config = require('../../config');


var secretKey = config.secretKey;


module.exports = function(app, express){
  var one_meta_api = express.Router();

  one_meta_api.post('/onedata', function(req, res){
    //console.log(req.body.id1);
    //console.log(req.body.name);
    //console.log(req.body.parentid);
    //console.log(req.body.size);
    //console.log(req.body.downloadlink);
    //console.log(req.body.type);
    //console.log(req.body.modified);

    var one_data = new One_Meta({
      id1: req.body.id1,
      name: req.body.name,
      parentid: req.body.parentid,
      size: req.body.size,
      downloadlink: req.body.downloadlink,
      type: req.body.type,
      modified: req.body.modified,
      one_id: req.body.one_id

    });

    one_data.save(function(err){
      if(err){
        console.log("Error hai bhai");
        console.log(err);
        res.send(err);
        return;
      }
      res.json({message : 'Data has been Entered'});
      console.log("Data is entered");

    });
  });
  one_meta_api.post('/catch', function(req,res){

    One_Meta.find({"one_id": req.body.allu},function(err,oneling){

      if(err)
      {
        res.send(err);
        return;
      }

      res.json(oneling);
    });
  });
  one_meta_api.post('/findid', function(req,res){
    //console.log("In Id Api");

    One_Meta.find({"parentid": req.body.parent, "name": req.body.name},function(err,oneling){

      if(err)
      {
        res.send(err);
        return;
      }

      res.json(oneling);
    });
  });

  one_meta_api.post('/findchild', function(req, res){
    One_Meta.find({"parentid": req.body.parent, "one_id": req.body.allu},function(err,oneling){

      if(err)
      {
        res.send(err);
        return;
      }

      res.json(oneling);
    });

  });

  return one_meta_api;

}
