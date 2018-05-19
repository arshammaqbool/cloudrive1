var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var MegaSchema = new Schema({

  node_id: {type: String, required: true},
  parent_id: {type: String, required: true},
  name: {type: String, required: true},
  size: {type: Number, required: true},
  is_dir: {type: Boolean, required: true},
  type: {type: String, required: true},
  modified: {type: String, required: true},
  mega_id: {type: String, required: true}

});

MegaSchema.pre('save', function(next){
  var mega = this;
  next();
});


module.exports= mongoose.model('Mega_Meta',MegaSchema);
