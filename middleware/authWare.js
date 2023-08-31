import tokenService from '../service/token-service.js'

const AuthWare = (req, res, next) => {
    try {
      const authoruzationHeader = req.headers.authorization;
      if (!authoruzationHeader) {
        return res.status(400).json({message: "Пользователь не авторизован"})
      }
      const accessToken = authoruzationHeader.split(' ')[1]
      if (!accessToken) {
        return res.status(400).json({message: "Пользователь не авторизован"})
      } 
      const userData = tokenService.validateAccessToken(accessToken)
      if (!userData) {
        return res.status(400).json({message: "Пользователь не авторизован"})
      }
      req.user = userData
      next()
    } catch(e) {
      return next()
    }
}
export default AuthWare