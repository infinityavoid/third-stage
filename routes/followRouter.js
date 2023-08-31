import { Router } from 'express';
import followController from '../controllers/followController.js'
const followRouter = new Router()

followRouter.post('/switch', followController.follow)
export default followRouter