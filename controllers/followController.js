import followService from'../service/follow-service.js'

class FollowController {
    async follow(req, res)
    {
        try {
            const user = req.user
            const {followId} = req.body
            const follow = await followService.follow(user.id, followId)
            return res.status(200).json(follow)
          } catch(e) {
            console.log(e)
            return res.status(400).json({message: "Ошибка"})
          }
    }
}

const followController = new FollowController()
export default followController