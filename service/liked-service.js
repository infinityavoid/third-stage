import User from '../models/user-model.js'

class LikedService {
    async addTrack(userId, trackId) {
      const user = await User.findById({_id: userId}) //находим пользователя
      console.log(user)
      const tracks = user.liked //есть ли у юзера таокой трек
      console.log(tracks)
      if (tracks.find(el => el == trackId)) {
        const deleteLiked = await User.findOneAndUpdate({_id: userId}, {$pull: {liked: trackId}}, {new: true})
        return deleteLiked
      }
      else
      {
        const addLiked = await User.findOneAndUpdate({_id: userId}, {$push: {liked: trackId}}, {new: true})
        return addLiked
      }
    }
  }
const likedService = new LikedService()
export default likedService