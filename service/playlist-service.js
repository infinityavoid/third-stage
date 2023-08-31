import Playlist from '../models/playlist-model.js';

class PlaylistService {
    async addPlaylist(name, userId, playlistPic) {
        const checkName = await Playlist.findOne({name})
        if (checkName)
        {
          throw Error('Плейлист с таким именем существует')
        } 
        const playlist = await Playlist.create({name, user:userId, playlistPic})
        return playlist
    }
  
    async editName(name, userId,playlistId)
    {
      const playlist = await Playlist.findOneAndUpdate({_id: playlistId,user:userId},{name:name},{new: true})
      if (playlist)
      {
          return playlist
      }
      else
      {
        throw Error('Плейлист не найден либо вы не являетесь его владельцем')
      } 
    }
    async editPicture(playlistPic, userId,playlistId)
    {
      const playlist = await Playlist.findOneAndUpdate({_id: playlistId,user:userId},{playlistPic:playlistPic},{new: true})
      if (playlist)
      {
          return playlist
      }
      else
      {
        throw Error('Плейлист не найден либо вы не являетесь его владельцем')
      } 
    }
  
    async deletePlaylist(userId,playlistId)
    {
      const playlist = await Playlist.findOneAndDelete({user: userId,_id:playlistId})
      if (!playlist) throw Error('Плейлист не найден либо вы не являетесь его владельцем')
      return playlist
    }
  
    async addTrack(playlistId, trackId, userId) { 
      const checkPlaylist = await Playlist.findOne({_id: playlistId,user:userId})
      if(!checkPlaylist) 
      {
        throw Error('Плейлист не найден либо вы не являетесь его владельцем')
      }
      const tracks = checkPlaylist.tracks
      if (tracks.find(el => el == trackId)) {
        throw Error('Данный трек уже добавлен')
      }
      const playlist = await Playlist.findByIdAndUpdate({user: userId,_id:playlistId}, {$push: {tracks: trackId}}, {new: true})
      return playlist
    }
  
    async deleteTrack(playlistId, trackId, userId) {//проверка обязательная + посмотреть функцию файнд там чето ржака
      const checkPlaylist = await Playlist.findOne({_id: playlistId,user:userId})
      if(!checkPlaylist)
      {
        throw Error('Плейлист не найден либо вы не являетесь его владельцем')
      } 
  
      const playlist = await Playlist.findByIdAndUpdate({user: userId,_id:playlistId}, {$pull: {tracks: trackId}}, {new: true})
      return playlist
    }
  }

const playlistService = new PlaylistService()
export default playlistService