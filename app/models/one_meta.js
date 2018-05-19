var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var OneSchema = new Schema({

  id1: {type: String, required: true},
  name: {type: String, required: true},
  parentid: {type: String, required: true},
  size: {type: Number, required: true},
  downloadlink: {type: String, required: true},
  type: {type: String, required: true},
  modified: {type: String, required: true},
  one_id: {type: String, required: true}

});


OneSchema.pre('save',function(next){
  var one = this;
  next();
});


module.exports= mongoose.model('One_Meta',OneSchema);
