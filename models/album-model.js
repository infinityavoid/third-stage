import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const albumSchema = new Schema({
    name: {type: String, required: true},
    artist: [{type: Schema.Types.ObjectId, ref: 'artist-model', required: true}], 
    tracks: [{type: Schema.Types.ObjectId, ref: 'track-model'}], 
    user: {type: Schema.Types.ObjectId, ref: 'user-model', required: true},
    albumPic: {type: String}
});

const Album = model('Album', albumSchema);
export default Album;
