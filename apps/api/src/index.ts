// this is our front door
import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

// Routes
import exerciseRoutes from './Routes/exercises.routes.js';
import sessionRoutes from './Routes/sessions.routes.js';
import userRoutes from './Routes/users.routes.js';
import setRoutes from './Routes/sets.routes.js';

const PORT = process.env.PORT || 3000;
const app = express();

// Adding middleware
app.use(express.json()); // lets us parse json from incoming payloads
app.use(cors()); // prevents cors errors when calling endpoints from a browser
app.use('/exercises', exerciseRoutes);
app.use('/sessions', sessionRoutes);
app.use('/users', userRoutes);
app.use('/sets', setRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'Congrats, you made it to the OCD API! SHAAAAUUUMMM' });
});

app.listen(PORT, () => {
  console.log(`ALL SYSTEMS [ONLINE] OFFLINE... LISTENING ON PORT ${PORT}`);
});
