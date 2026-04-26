import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  url: String,
});

export default mongoose.model('Song', songSchema);