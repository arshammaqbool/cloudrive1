var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var CloudSchema = new Schema({

  user_id: {type: String, required: true},
  cloud_name: {type: String, required: true},
  e_mail: {type: String, index: { unique:true }},
  password: {type: String, select: false},
  total_space: {type: Number, required: true},
  remaining_space: {type: Number, required: true}
});

CloudSchema.pre('save', function(next){

  var cloud = this;
  bcrypt.hash(cloud.password, null, null, function(err, hash){
    if(err) return next(err);

    cloud.password = hash;
    next();
  });
});

CloudSchema.methods.comparePassword = function(password){

  var cloud = this;
  return bcrypt.compareSync(password, cloud.password);
}

module.exports = mongoose.model('Cloud',CloudSchema);
