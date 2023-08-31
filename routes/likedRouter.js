import { Router } from 'express';
import likedController from '../controllers/likedController.js'
const likedRouter = new Router()

likedRouter.get('/get', likedController.getTracks)
likedRouter.post('/add', likedController.addTrack)
export default likedRouter