import { Router } from 'express';
import artistController from '../controllers/artistController.js'
import multer from 'multer';

const artistRouter = new Router()
const artistStorage = multer.diskStorage({
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
  const artistUpload = multer({storage:artistStorage})

artistRouter.get('/get', artistController.getArtists)
artistRouter.post('/add', artistUpload.single('artistPic'),artistController.addArtist)
artistRouter.post('/edit/name', artistController.editName)
artistRouter.post('/edit/picture',artistUpload.single('artistPic'), artistController.editPicture)
artistRouter.delete('/delete', artistController.deleteArtist)

export default artistRouter