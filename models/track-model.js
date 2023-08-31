import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const trackSchema  = new Schema({
    name: {type: String, required: true},
    artist: [{type: Schema.Types.ObjectId, ref: 'artist-model', required: true}], 
    url: {type: String, required: true},
    trackPicture: {type: String}
});

const Track = model('Track', trackSchema);
export default Track;