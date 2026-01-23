import express from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import booksRoutes from './routes/bookRoutes.js';
import cors from 'cors';
// import dotenv from 'dotenv'
const app = express();

const port = 5000;

// dotenv.config();

app.use(cors());

mongoose.connect('mongodb+srv://Anuj:Anuj2005@anujapi.pcejgp8.mongodb.net/BookStore')
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



