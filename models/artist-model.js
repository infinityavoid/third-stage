import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const artistSchema = new Schema({
  name: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'user-model', required: true},
  artistPic: {type: String}
});

const Artist = model('Artist', artistSchema);
export default Artist;