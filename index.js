import express from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import booksRoutes from './routes/bookRoutes.js';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv'
const port = 5000;

dotenv.config();

app.use(cors({
  origin:['https://online-bookstore-frontend-m7j0nsab0.vercel.app','http://localhost:5173']
}));

mongoose.connect(process.env.DB_URL)
.then((val)=>{
    app.listen(port,()=>{
    console.log('database connected and server is running'); 
  })

   }).catch((err)=>{ 
    console.log(err);
  })


  app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'server is running'
  })  
  })



app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
}));

app.use(express.static('uploads'));
app.use(userRoutes);
app.use(booksRoutes);



