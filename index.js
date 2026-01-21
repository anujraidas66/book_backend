import express from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import booksRoutes from './routes/bookRoutes.js';
import dotevn from 'dotenv';
import cors from 'cors';
const app = express();
const port = 5000;

dotevn.config({});

mongoose.connect(process.env.DB_URL)
.then((val)=>{
    app.listen(port,()=>{
    console.log('database connected and server is running'); 
  })

   }).catch((err)=>{ 
    console.log(err);
  })
app.use(cors({
  origin:[]
}));
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
}));

app.use(express.static('uploads'));
app.use(userRoutes);
app.use(booksRoutes);



