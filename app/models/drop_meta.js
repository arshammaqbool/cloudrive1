var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Dropbox = require('dropbox').Dropbox;
var Schema = mongoose.Schema;


var DropSchema = new Schema({
  readonly: {type: Boolean, required: true},
  bytes: {type: Number, required: true},
  rev: {type: String, required: true},
  modified: {type: String, required: true},
  size: {type: String, required: true},
  path: {type: String, required: true},
  parent: {type: String, required: true},
  is_dir: {type: Boolean, required: true},
  root: {type: String, required: true},
  type: {type: String, required: true},
  name: {type: String, required: true},
  downloadlink: {type: String, required: true},
  file: {type: String, required: true},
  drop_id: {type: String, required: true}

});

DropSchema.pre('save',function(next){
  var drop= this;
  next();
});

module.exports= mongoose.model('Drop_Meta',DropSchema);
