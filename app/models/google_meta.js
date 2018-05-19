var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var GoogleSchema = new Schema({
  key: {type: String, required: true},
  name: {type: String, required: true},
  size: {type: Number, required: true},
  modified: {type: String, required: true},
  mime_type: {type: String, required: true},
  is_dir: {type: Boolean, required: true},
  parent_id: {type: String, required: true},
  downloadlink: {type: String, required: true},
  google_id: {type: String, required: true}

});

GoogleSchema.pre('save', function(next){
  var google = this;
  next();
});


module.exports= mongoose.model('Google_Meta',GoogleSchema);
