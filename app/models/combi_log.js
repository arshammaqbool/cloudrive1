var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var LogSchema = new Schema({

  name: {type: String, required: true},
  size: {type: Number, required: true},
  modified: {type: String, required: true},
  path: {type: String, required: true},
  parent: {type: String, required: true},
  is_dir: {type: Boolean, required: true},
  type: {type: String, required: true},
  downloadlink: {type: String, required: true},
  upload_location: {type: String, required: true},
  log_id: {type: String, required: true}

});


LogSchema.pre('save', function(next){

  var logg = this;
  next();
});


module.exports= mongoose.model('Combi_Log',LogSchema);
