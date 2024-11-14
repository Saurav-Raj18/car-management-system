const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    //required: true,
  },
  profilePicture: {
    type: String,
    default: 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='

  },


}, { timestamps: true });

UserSchema.methods.getjwttoken=function(){
  return jwt.sign({id:this.id},process.env.JWT_SECRET,{
       expiresIn:"1d"
   })
}

const User = mongoose.model('User', UserSchema);

module.exports = { User };
