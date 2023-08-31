import likedService from '../service/liked-service.js'
import User from '../models/user-model.js'

class LikedController {
    async getTracks(req, res, next) {
      try {
        const user = req.user
        const tracks = await User.findOne({_id: user.id})
        return res.status(200).json(tracks.liked)
      } catch(e) {
        console.log(e)
        return res.status(400).json({message: "Ошибка"})
      }
    }
  
    async addTrack(req, res, next) {
      try {
        const user = req.user
        const {id} = req.body       

        const track = await likedService.addTrack(user.id, id)
        return res.status(200).json(track)
      } catch(e) {
        return res.status(400).json({message: "Ошибка"})
      }
    }
  }
const likedController = new LikedController()
export default likedController