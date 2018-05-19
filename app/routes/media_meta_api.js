var Media_Meta = require('../models/media_meta');

var config = require('../../config');

var secretKey = config.secretKey;


module.exports = function(app, express){

  var media_meta_api = express.Router();

  media_meta_api.post('/mediadata', function(req, res){
    var media_data= new Media_Meta({
      key: req.body.key,
      size: req.body.size,
      is_dir: req.body.is_dir,
      name: req.body.name,
      mime_type: req.body.mime_type,
      created: req.body.created,
      downloadlink: req.body.downloadlink,
      parent: req.body.parent,
      media_id: req.body.media_id

  });
  media_data.save(function(err){
    if(err){
      console.log(err);
      res.send(err);
      return;
    }

    res.json({message : 'Data has been Entered'});
    console.log("Data is entered");

  });

});
media_meta_api.post('/pouch', function(req,res){

  Media_Meta.find({"media_id": req.body.allu},function(err,medling){

    if(err)
    {
      res.send(err);
      return;
    }

    res.json(medling);
  });
});
media_meta_api.post('/findid', function(req,res){
  //console.log("In Id Api");

  Media_Meta.find({"parent": req.body.parent, "name": req.body.name},function(err,medling){

    if(err)
    {
      res.send(err);
      return;
    }

    res.json(medling);
  });
});
media_meta_api.post('/findchild', function(req, res){
  Media_Meta.find({"parent": req.body.parent, "media_id": req.body.allu},function(err,medling){

    if(err)
    {
      res.send(err);
      return;
    }

    res.json(medling);
  });

});

return media_meta_api;
}
