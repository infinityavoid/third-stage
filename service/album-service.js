import Album from '../models/album-model.js'

class AlbumService {
  async addAlbum(name,artist,tracks,albumPic,userId) {
    const checkName = await Album.findOne({name})

    if (checkName) 
    {
      throw Error('Альбом с таким именем существует')
    }
    const album = await Album.create({name, artist, tracks,user:userId, albumPic})
    return album
  }
  async editName(name,albumId, userId)
  {
    const album = await Album.findOneAndUpdate({_id: albumId,user:userId},{name:name},{new: true})
    if (album)
    {
        return album
    }
    else {
      throw Error('Альбом не найден либо вы не являетесь его владельцем') 
    }
  }
  async editPicture(albumPic,albumId, userId)
  {
    console.log(albumPic,albumId,userId)
    const album = await Album.findOneAndUpdate({_id: albumId,user:userId},{albumPic:albumPic},{new: true})
    if (album)
    {
        return album
    }
    else {
      throw Error('Альбом не найден либо вы не являетесь его владельцем') 
    }
  }
  async deleteAlbum(userId,albumId)
  {
    const album = await Album.findOneAndDelete({_id: albumId,user:userId})
    if (!album) {
      throw Error('Альбом не найден либо вы не являетесь его владельцем')
    }
    return album
  }
}

const albumService = new AlbumService()
export default albumService
