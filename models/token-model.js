import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const tokenSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'user-model'},
  refreshToken: {type: String, required: true}
});

const Token = model('Token', tokenSchema);
export default Token