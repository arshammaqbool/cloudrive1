var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var MediaSchema = new Schema({

  key: {type: String, required: true},
  size: {type: Number, required: true},
  is_dir: {type: Boolean, required: true},
  name: {type: String, required: true},
  mime_type: {type: String, required: true},
  created: {type: String, required: true},
  downloadlink: {type: String, required: true},
  parent: {type: String, required: true},
  media_id: {type: String, required: true}

});

MediaSchema.pre('save', function(next){
  var media = this;
  next();
});

module.exports = mongoose.model('Media_Meta', MediaSchema);
