import Track from '../models/track-model.js'
import Artist from '../models/artist-model.js'

class TrackService {
  async getTracks() {
    const tracks = await Track.find().populate('artist')
    return tracks
  }
  async addTrack(name,artists, url, pic,userId) 
  {
    const artist = await Artist.findOne({user:userId})
    if (artist)
    {
      artists.push(artist._id)
      const track = new Track({name,artist:artists,url, trackPicture:pic})
      await track.save()
      return track
    }
    else 
    {
      throw new Error("Вы не являетесь артистом")
    }
  }
  async deleteTrack(id,userId)
  {
    const artist = await Artist.findOne({user:userId})
    if (artist)
    {
      const track = await Track.findOneAndDelete({_id: id},{artist:artist.user})
      if(track)
      {
        await track.save()
        return track
      }
      else 
      {
        throw new Error("У вас нет прав на удаление этого трека")
      }
    }
    else 
    {
      throw new Error("Вы не являетесь артистом")
    }
  }
}

const trackService = new TrackService()
export default trackService