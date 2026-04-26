import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import songRoutes from './routes/songRoutes.js';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/songs', songRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});