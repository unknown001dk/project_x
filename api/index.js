import express from 'express';
import dotenv from 'dotenv';
import router from './routes/User-route.js';
import { Database } from './config/db.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/users', router);

const port = process.env.PORT || 3000;

Database();

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});