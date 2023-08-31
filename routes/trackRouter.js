import { Router } from 'express';
import tracksController from '../controllers/tracksController.js'
import multer from 'multer'

const trackRouter = new Router()
const trackStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.mimetype === 'audio/mpeg')
        {
            cb(null, 'audio')
        }
        else if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')
        {
            cb(null, 'pictures')
        }
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  const trackUpload = multer({storage:trackStorage})


trackRouter.get('/get', tracksController.getTracks)
trackRouter.post('/add',trackUpload.fields([
    { name: 'url', maxCount: 1 },
    { name: 'trackPicture', maxCount: 1 }
  ]), tracksController.addTrack)
trackRouter.delete('/delete', tracksController.deleteTrack)
export default trackRouter