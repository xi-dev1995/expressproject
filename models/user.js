var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var passportLocalMongoose = require('passport-local-mongoose'); 
  
  
var UserSchema = new Schema({    
    email: {type: String, required:true, unique:true}, 
    username : {type: String, unique: true, required:true},
    feeds: [{
        type: Schema.Types.ObjectId,
        ref: "Feed"
    }]
}); 
  
// plugin for passport-local-mongoose 
UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'} ); 
  
// export userschema 
module.exports = mongoose.model("User", UserSchema);
