import User from '../models/user-model.js';
import bcrypt from 'bcrypt';
import tokenService from '../service/token-service.js';

class UserService {
    async registration(fullname, email, username, password,profilePic) {
        const checkUsername = await User.findOne({username})
        if (checkUsername) {
            throw new Error("Пользователь с таким именем уже существует")
        }
        const checkEmail = await User.findOne({email})
        if (checkEmail) {
            throw new Error("Пользователь с таким email уже существует")
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const user = new User({fullname, email, username, password:hashPassword,profilePic})
        const tokens = tokenService.generateTokens({id:user._id})
        await user.save()
        await tokenService.saveToken(user._id, tokens.refreshToken)
        return {
        ...tokens
        }
    }

    async login(login, password) {
        const userCheck = await User.findOne({
            $or: [
                {email: login}, 
                {username: login}
            ]
        })
        if (!userCheck) {
            throw new Error("Неправильный логин или email")
        }
        const validPassword = bcrypt.compareSync(password, userCheck.password)
        if (!validPassword) {
            throw new Error("Введен неверный пароль")
        }
        const tokens = tokenService.generateTokens({id:userCheck._id})
        await tokenService.saveToken(userCheck._id, tokens.refreshToken)
        return {
        ...tokens
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken)
        {
            throw Error('Пользователь не авторизован') 
        } 
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB)
        {
            throw Error('Пользователь не авторизован')
        } 
        const user = await User.findById(userData.id)
        const tokens = tokenService.generateTokens(userData.id)
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {
        ...tokens
        }
    }
}
const userService = new UserService()
export default userService