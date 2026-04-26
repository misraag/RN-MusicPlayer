import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json([
        {
            id: 1,
            title: 'Song One',
            artist: 'Artist One',
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        }
    ]);
});

export default router;