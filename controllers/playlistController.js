import playlistService from '../service/playlist-service.js';
import Playlist from '../models/playlist-model.js';
import fs from 'fs'; 

class PlaylistController {
    async getPlaylists(req, res, next) {
      try {
        const user = req.user
  
        const playlists = await Playlist.find({user: user.id}).populate('tracks')
  
        return res.status(200).json(playlists)
      } catch(e) {
        return res.status(400).json({message: "Ошибка"})
      }
    }
  
    async addPlaylist(req, res, next) {
      try {
        const user = req.user
        const {name} = req.body
        const playlistPic = req.file.path
        const playlist = await playlistService.addPlaylist(name, user.id,playlistPic)
  
        return res.status(200).json(playlist)
  
      } catch(e) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({message: "Ошибка"})
      }
    }
  
    async editName(req,res,next){
        try {
            const user = req.user
            const {name,playlistId} = req.body
            const playlist = await playlistService.editName(name, user.id,playlistId)
            return res.status(200).json(playlist)
        } catch (error) {
            return res.status(400).json({message: "Ошибка"})
        }
    }
    async editPicture(req,res,next){
        try {
            const user = req.user
            const playlistPic = req.file.path
            const playlist = await playlistService.editPicture(playlistPic, user.id,playlistId)
            return res.status(200).json(playlist)
        } catch (error) {
          if (req.file) {
            fs.unlinkSync(req.file.path);
          }
            return res.status(400).json({message: "Ошибка"})
        }
    }
  
    async deletePlaylist(req,res,next){
        try {
            const user = req.user
            const playlist = await playlistService.deleteplaylist(user.id,playlistId)
            return res.status(200).json(playlist)
        } catch (error) {
            return res.status(400).json({message: "Ошибка"})
        }
    }
  
    async addTrack(req, res, next) {
      try {
        const user = req.user
        const {playlistId,trackId} = req.body
  
        const playlist = await playlistService.addTrack(playlistId, trackId, user.id)
  
        return res.status(200).json(playlist)
      } catch(e) {
        return res.status(400).json({message: "Ошибка"})
      }
    }
  
    async deleteTrack(req, res, next) {
      try {
        const user = req.user
        const {playlistId,trackId} = req.body
  
        const playlist = await playlistService.deleteTrack(playlistId, trackId, user.id)
  
        return res.status(200).json(playlist)
      } catch(e) {
        return res.status(400).json({message: "Ошибка"})
      }
    }
  }
const playlistController = new PlaylistController()
export default playlistController