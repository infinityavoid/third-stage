import userService from '../service/user-service.js'
import {validationResult} from 'express-validator'
import fs from 'fs'

class AuthController {
    async registration (req, res){
        try {
            console.log(req.body)
            const validationErr = validationResult(req)
            if(!validationErr.isEmpty())
            {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                  }
                return res.status(400).json({message: "Ошибка при регистрации", validationErr})
                
            }
            const {username, password, email, fullname} = req.body;
            let profilePic = req?.file?.path
            if(!profilePic)
            {
                profilePic = 'pictures\\anonymo'
            }
            else profilePic = req.file.path
            const user = await userService.registration(fullname, email, username, password,profilePic)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.status(200).json(user)
        } catch(e){
            if (req.file) {
                fs.unlinkSync(req.file.path);
              }
            res.status(400).json({message:"Ошибка при регистрации"})
        }  
    }
    async login (req, res){
        try {
            const { login, password } = req.body
            console.log(req.body)
            const user = await userService.login(login, password)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.status(200).json(user)
          } catch(e){
            console.log(e)
            res.status(400).json({message:"Ошибка при входе в аккаунт"})
        } 
    }
    async logout(req, res) {
        try {
          const {refreshToken} = req.cookies
          const token = await userService.logout(refreshToken)
          res.clearCookie('refreshToken')
          return res.json(token)
        } catch(e) {
          console.log(e)
          res.status(400).json({message:"Ошибка при выходе из аккаунта"})
        }
      }
    async refresh(req, res, next) {
    try {
        const {refreshToken} = req.cookies
        const user = await userService.refresh(refreshToken)
        res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
        return res.status(200).json(user)
    } catch(e) {
        console.log(e)
        next(e)
    }
    }
}

const authController = new AuthController()
export default authController