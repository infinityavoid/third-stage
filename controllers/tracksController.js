import trackService from '../service/track-service.js';
import fs from 'fs'

class TrackController{
    async getTracks(req, res, next) {
        try {
          const tracks = await trackService.getTracks()
          return res.status(200).json(tracks)
        } catch(e) {
          console.log(e)
          return res.status(400).json({message: "Ошибка"})
        }
      }
    async addTrack(req, res, next) {
      try {
        const user = req.user
        const {name,artist} = req.body
        let artistArray = []
        if(artist)
        {
          artistArray = artist.split(",");
        }
        const trackUrl = req.files['url'][0].path;
        const trackPictureUrl = req.files['trackPicture'][0].path;
        const track = await trackService.addTrack(name,artistArray, trackUrl,trackPictureUrl,user.id)
        return res.status(200).json(track)
      } catch(e) {
        console.log(e)
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({message: "Ошибка"})
      }
      }
      async deleteTrack(req,res,next)
      {
        try {
          const user = req.user
          const track = await trackService.deleteTrack(req.body.id,user.id)
          return res.status(200).json(track)
        } catch(e) {
          console.log(e)
          return res.status(400).json({message: "Ошибка"})
        }
      }
    }
const trackController = new TrackController()
export default trackController