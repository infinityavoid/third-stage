import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const playlistSchema = new Schema({
    name: {type: String, required: true},
    tracks: [{type: Schema.Types.ObjectId, ref: 'track-model'}], 
    user: {type: Schema.Types.ObjectId, ref: 'user-model', required: true},
    playlistPic: {type: String}
});

const Playlist = model('Playlist', playlistSchema);
export default Playlist;