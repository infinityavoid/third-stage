import Artist from '../models/artist-model.js'
import artistService from '../service/artist-service.js'
import fs from'fs'

class ArtistController {
    async getArtists(req, res, next) {
      try {
        const artists = await Artist.find()
        return res.status(200).json(artists)
      } catch(e) {
        console.log(e)
        return res.status(400).json({message: "Ошибка"})
      }
    }
  
    async addArtist(req, res, next) {
      try {
        const user = req.user
        const {name} = req.body
        const artistPic = req.file.path
        const artist = await artistService.addArtist(name, user.id, artistPic)
        return res.status(200).json(artist)
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
            const {name} = req.body
            const artist = await artistService.editName(name, user.id)
            return res.status(200).json(artist)
        } catch (error) {
            return res.status(400).json({message: "Ошибка"})
        }
    }
    async editPicture(req,res,next){
        try {
            const user = req.user
            const artistPic = req.file.path
            const artist = await artistService.editPicture(artistPic, user.id)
            return res.status(200).json(artist)
        } catch (error) {
          if (req.file) {
            fs.unlinkSync(req.file.path);
          }
            return res.status(400).json({message: "Ошибка"})
        }
    }
    async deleteArtist(req,res,next){
        try {
            const user = req.user
            const artist = await artistService.deleteArtist(user.id)
            return res.status(200).json(artist)

        } catch (error) {
            return res.status(400).json({message: "Ошибка"})
        }
    }
}
const artistController = new ArtistController()
export default artistController