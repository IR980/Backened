const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model')
const { uploadFile } = require('../services/storage.service');
const jwt = require('jsonwebtoken');

async function artistCreate(req, res) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (decoded.role !== 'artist') {
    return res.status(403).json({
      message: "You don't have access to upload music",
    });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'Music file is required' });
  }

  const title = req.body.title?.trim();
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const result = await uploadFile(req.file.buffer.toString('base64'));
  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: decoded.id,
  });

  return res.status(201).json({
    message: 'Music created successfully',
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}

async function createAlbum(req, res){
  const token = req.cookies.token;
  if(!token){
    res.status(401).json({
      message: "unauthorized"
    })
  }

  let decoded;
  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  }catch(err){
    res.status(401).json({
      message: "unauthorized"
    })
  }

  if(decoded.role !== "artist"){
    return res.status(403).json({
      message: "your are not get permission to create an album music"
    })
  }

  const {title, musics} = req.body;

  const album = await albumModel.create({
   title,
   artist: decoded.id,
   musics: musics
  })

  res.status(201).json({
     message: "album created successfull",
     album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      musics: album.musics
     }
  })

}

module.exports = {artistCreate, createAlbum};