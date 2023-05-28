import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDb } from './config/connectdb.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;


const DATABASE_URL = process.env.DATABASE_URL;


app.use(cors());
connectDb(DATABASE_URL);

app.use(express.json());



// Load Routes
app.use("/api/user/", userRouter)

app.listen(port, ()=>{
    console.log(`Server listening at localhost:${port}`);
})
