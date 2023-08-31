import { Router } from 'express';
import albumController from '../controllers/albumController.js';
import multer from 'multer';

const albumRouter = new Router()
const albumStorage = multer.diskStorage({
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
  const albumUpload = multer({storage:albumStorage})

albumRouter.get('/get', albumController.getAlbums)
albumRouter.post('/add', albumUpload.single('albumPic'),albumController.addAlbum)
albumRouter.post('/edit/name', albumController.editName)
albumRouter.post('/edit/picture',albumUpload.single('albumPic'), albumController.editPicture)
albumRouter.delete('/delete', albumController.deleteAlbum)

export default albumRouter