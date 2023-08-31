import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullname: {type: String, required: true},
  email: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  followers: [{type: Schema.Types.ObjectId, ref: 'user-model'}],
  liked:[{type: Schema.Types.ObjectId, ref: 'track-model'}],
  profilePic: String
});

const User = model('User', userSchema);
export default User;