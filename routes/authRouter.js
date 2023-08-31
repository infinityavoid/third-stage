import { Router } from 'express';
import authController from '../controllers/authController.js';
import {check} from 'express-validator';
import multer from 'multer';

const authRouter = new Router()
const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')
        {
            cb(null, 'pictures')
        }
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  const userUpload = multer({storage:userStorage})

authRouter.post('/registration',userUpload.single('profilePic'),[
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('fullname', 'Поле не может быть пустым').notEmpty(),
    check('email', 'Неправильный email').isEmail(),
    check('password','Пароль слишком простой').isStrongPassword({minLength:5,minLowercase:0,minNumbers:0,minSymbols:0,minUppercase:0})
    ], authController.registration)
authRouter.post('/login', authController.login)
authRouter.post('/logout',authController.logout)
authRouter.post('/refresh', authController.refresh)
export default authRouter