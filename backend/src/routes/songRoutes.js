import express from 'express';
import Song from '../models/Song.js';

const router = express.Router();

// GET songs (with search)
router.get('/', async (req, res) => {
  const { query } = req.query;

  let filter = {};

  if (query) {
    filter = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } },
      ],
    };
  }

  const songs = await Song.find(filter);
  res.json(songs);
});

// ADD song
router.post('/', async (req, res) => {
  const { title, artist, url } = req.body;

  const newSong = new Song({ title, artist, url });
  await newSong.save();

  res.json(newSong);
});

export default router;