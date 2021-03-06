var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userProfileSchema = new Schema({
    bio:{type:String,default:''},
    profile_pic:{type:String, default:"assets/profile_pic/default_profile_pic.jpg"},
    location:{type:String, default:"None"}
})
var user = new Schema({
    name: {type: String, required: true},
    user_id:{type:String, required:true},
    user_name:{type:String, required:true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    date_joined:{type:Date,required:true,default:Date.now()},
    userProfile:[userProfileSchema],
    followers:[{"user_id":String}],
    following:[{"user_id":String}],
    notifications:[{"acvtId":String,"by_user_id":String,read:Boolean,'activityType':String,'date':Number}],
    saved:[{"post_id":String}],
    messaged_users:[{"user_id":String}]
});


module.exports = mongoose.model('User', user);