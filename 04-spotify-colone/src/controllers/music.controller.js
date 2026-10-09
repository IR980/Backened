const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model')
const { uploadFile } = require('../services/storage.service');
const jwt = require('jsonwebtoken');

async function artistCreate(req, res) {

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
    artist: req.user.id,
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

  const {title, musics} = req.body;

  const album = await albumModel.create({
   title,
   artist: req.user.id,
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

async function getAllMusic(req, res) {
  const musics = await musicModel.find().populate("artist")
  res.status(200).json({
    message: "mucisc fetched successfully",
    musics: musics,
  })
}

async function getAllAlbum(req, res){
  const album = await albumModel.find().populate("artist").populate("musics")
  res.status(200).json({
    message: "album fetched succesfully",
    album: album,
  })
}

module.exports = {artistCreate, createAlbum, getAllMusic, getAllAlbum};