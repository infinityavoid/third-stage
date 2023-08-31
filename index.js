import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRouter from './routes/authRouter.js';
import trackRouter from './routes/trackRouter.js';
import artistRouter from './routes/artistRouter.js';
import albumRouter from './routes/albumRouter.js';
import followRouter from './routes/followRouter.js';
import likedRouter from './routes/likedRouter.js';
import playlistRouter from './routes/playlistRouter.js';
import authWare from './middleware/authWare.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
app.use(cookieParser())


app.use('/auth', authRouter)
app.use('/tracks', authWare, trackRouter)
app.use('/artist', authWare, artistRouter)
app.use('/album', authWare, albumRouter)
app.use('/follow', authWare, followRouter)
app.use('/liked', authWare,likedRouter)
app.use('/playlists', authWare, playlistRouter)
app.use('/audio', express.static('audio'))
app.use('/pictures',express.static('pictures'))



const PORT = 8000;

const db = 'mongodb+srv://Anton:Pass321@cluster0.w8f7lje.mongodb.net/spotify?retryWrites=true&w=majority'

app.listen(PORT, ()=>console.log('server started on Port ' + PORT))
mongoose.connect(db)
.then((res) => console.log('connected to spotify clone database'))
.catch((error) => console.log(error))