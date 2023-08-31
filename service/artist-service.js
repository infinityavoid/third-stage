import Artist from'../models/artist-model.js'

class ArtistService {
  async addArtist(name, userId, artistPic) {
    if (!name)
    {
      throw Error('Поле name пустое')
    } 
    const artistCheck = await Artist.findOne({user:userId})
    if (!artistCheck)
    {
        const artist = await Artist.create({name: name, user: userId, artistPic:artistPic})
        return artist
    }
    else 
    {
      throw Error('Может быть создан только 1 артист')
    }
  }
  async editName(name, userId)
  {
    const artist = await Artist.findOneAndUpdate({user:userId},{name:name},{new: true})
    if (artist)
    {
        return artist
    }
    else 
    {
      throw Error('Артист не найден') 
    }
  }
  async editPicture(artistPic, userId)
  {
    const artist = await Artist.findOneAndUpdate({user:userId},{artistPic:artistPic},{new: true})
    if (artist)
    {
        return artist
    }
    else
    {
      throw Error('Артист не найден')
    } 
  }
  async deleteArtist(userId)
  {
    const artist = await Artist.findOneAndDelete({user: userId})
    if (!artist) 
    {
      throw Error('Артист не найден')
    }
    return artist
  }
}
const artistService = new ArtistService()
export default artistService