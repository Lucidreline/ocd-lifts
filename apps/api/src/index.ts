// this is our front door
import "dotenv/config";
import express, { Request, Response } from 'express'
import cors from 'cors'

// Routes
import userRoutes from './Routes/users.routes.js'

const app = express()
const PORT = process.env.PORT || 3000;

// Adding middleware
app.use(cors()) // prevents cors errors when calling endpoints from a browser
app.use(express.json()) // lets us parse json from incoming payloads
app.use('/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
    res.json({ msg: 'Congrats, you made it to the OCD API! SHAAAAUUUMMM' })
})

app.listen(PORT, () => {
    console.log(`ALL SYSTEMS [ONLINE] OFFLINE... LISTENING ON PORT ${PORT}`)
})