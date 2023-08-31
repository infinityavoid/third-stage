import User from '../models/user-model.js'

class FollowService {
    async follow(userId, followId) {
      const followUser = await User.findById(followId)
      if(followUser.followers.includes(userId)){
        const user = await User.findByIdAndUpdate({_id: followId}, {$pull: {followers: userId}}, {new: true})
        console.log('unfollowed')
        return user
      }
      else{
        const user = await User.findByIdAndUpdate({_id: followId}, {$push: {followers: userId}}, {new: true})
        console.log('followed')
        return user
      }
    }
  }
const followService = new FollowService()
export default followService