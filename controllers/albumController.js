import Album from '../models/album-model.js';
import Track from '../models/track-model.js';
import albumService from '../service/album-service.js';
import fs from 'fs';

class AlbumController {
    async getAlbums(req, res, next) {
      try {
        const album = await Album.find()
        return res.status(200).json(album)
      } catch(e) {
        console.log(e)
        return res.status(400).json({message: "Ошибка"})
      }
    }
  
    async addAlbum(req, res, next) {
      try {
        const user = req.user
        const {name, tracks} = req.body
        const albumPic = req.file.path
        let tracksArray = []
        const uniqueArtists = new Set();
        if(tracks)
        {
            tracksArray = tracks.split(",");
            for(let i = 0; i < tracksArray.length; i++)
            {
                const track = await Track.findById(tracksArray[i])

                track.artist.forEach((artist) =>{
                    uniqueArtists.add(artist.toString());
                })
            }
        }
        const uniqueArtistsArray = Array.from(uniqueArtists);
        const album = await albumService.addAlbum(name,uniqueArtistsArray,tracksArray,albumPic,user.id)
        return res.status(200).json(album)
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
            const {name,albumId} = req.body
            const album = await albumService.editName(name,albumId, user.id)
            return res.status(200).json(album)
        } catch (error) {
            return res.status(400).json({message: "Ошибка"})
        }
    }
    async editPicture(req,res,next){
        try {
            const user = req.user
            const {albumId} = req.body
            const albumPic = req.file.path
            const album = await albumService.editPicture(albumPic,albumId, user.id)
            return res.status(200).json(album)
        } catch (error) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
              }
            return res.status(400).json({message: "Ошибка"})
        }
    }
    async deleteAlbum(req,res,next){
        try {
            const user = req.user
            const {albumId} = req.body
            console.log(albumId,user)
            const album = await albumService.deleteAlbum(user.id,albumId)
            return res.status(200).json(album)
        } catch (error) {
            return res.status(400).json({message: "Ошибка"})
        }
    }
}

const albumController = new AlbumController()
export default albumController