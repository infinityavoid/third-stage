import Router from 'express';
import playlistController from '../controllers/playlistController.js';
import multer from 'multer';

const playlistRouter = new Router()
const playlistStorage = multer.diskStorage({
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
  const playlistUpload = multer({storage:playlistStorage})

playlistRouter.get('/get', playlistController.getPlaylists)
playlistRouter.post('/add', playlistUpload.single('playlistPic'),playlistController.addPlaylist)
playlistRouter.post('/edit/name', playlistController.editName)
playlistRouter.post('/edit/picture',playlistUpload.single('playlistPic'), playlistController.editPicture)
playlistRouter.delete('/delete', playlistController.deletePlaylist)
playlistRouter.post('/track/add/', playlistController.addTrack)
playlistRouter.delete('/track/delete/', playlistController.deleteTrack)

export default playlistRouter