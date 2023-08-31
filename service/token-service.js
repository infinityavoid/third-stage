import jwt from 'jsonwebtoken'
import Token from'../models/token-model.js'
import {secretKey, refreshKey} from '../config.js'

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, secretKey, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, refreshKey, {expiresIn: '30d'})
        return {
            accessToken, refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne({refreshToken})
        return tokenData
    }
    validateAccessToken(token) {
        try {
        const user = jwt.verify(token, secretKey)
        return user
        } catch(e) {
        return null
        }
    }
    
    validateRefreshToken(token) {
        try {
        const user = jwt.verify(token, refreshKey)
        return user
        } catch(e) {
        return null
        }
    }
    
    async findToken(refreshToken) {
        const tokenData = await Token.findOne({refreshToken})
        return tokenData
    }
}
const tokenService = new TokenService()
export default tokenService
