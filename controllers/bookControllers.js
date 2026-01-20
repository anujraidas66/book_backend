import { Book } from "../models/Book.js"
import fs from 'fs';
export const getAllBooks = async (req, res) => {
    try {
      const books =  await Book.find({});
        return res.status(200).json({
            status: 'success',
            books
        })
    } catch (err) {
        return res.status(400).json({
            status: 'error',
            message: err.message
        })
        
    }
};

export const getSingleBook = async (req, res) => {

  try {
    const isExist = await Book.findById(req.id);
    if (!isExist) {
      return res.status(404).json({
        status: "error",
        message: "Book not found"
      });
    }

    return res.status(200).json({
      status: "success",
      book: isExist
    });

  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

export const createBook = async (req, res) => {
    const {title, author, price, description, category, stock} = req.body ?? {};
    // console.log(req.imagePath);
    try {
        await Book.create({
            title,
            author,
            image: req.imagePath,
            price,
            description,
            category,
            stock
        });

        return res.status(201).json({
            status: 'success',
            message: 'Book successfully added'
        })
    } catch (err) {
        fs.unlink(`./uploads/${req.imagePath}`, (error) => {
            return res.status(400).json({
            status: 'error',
            message: err.message
        })
        });
        
    }
}


export const updateBook = async (req, res) => {
  const {title, author, price, description, category, stock, quantity} = req.body ?? {};
    
  try {

    const isExist = await Book.findById(req.id);
    if(!isExist){
      if(req.imagePath){
        fs.unlinkSync(`./uploads/${req.imagePath}`);
        return res.status(404).json({
          status: 'error',
          data: 'Book not found'
        });
      }else{
        return res.status(404).json({
        status: 'error',
        data: 'Book not found'
    });

      }
    }

    isExist.title = title || isExist.title;
    isExist.author = author || isExist.author;
    isExist.price = price || isExist.price;
    isExist.description = description || isExist.description;
    isExist.category = category || isExist.category;
    isExist.stock = stock || isExist.stock;
    isExist.quantity = quantity || isExist.quantity;
    await isExist.save();

    // updating file
   if(req.imagePath){
    fs.unlink(`./uploads/${isExist.image}`,async(err)=>{
      isExist.image =req.imagePath;
      await isExist.save();
      return res.status(200).json({
        status: 'success',
        data: 'Book updated successfully'
      });
    })

   }else{
    return res.status(200).json({
        status: 'success',
        data: 'Book updated successfully'
    });
   }


    } catch (err) {
   if(req.imagePath){
        fs.unlink(`./uploads/${req.imagePath}`,(error)=>{
           return res.status(500).json({
        status: 'error',
        message: err.message
    });

  })
      }else{
       return res.status(500).json({
        status: 'error',
        message: err.message
    })
  }
    }
}


export const deleteBook = async (req, res) => {
   try {
   const isExist = await Book.findById(req.id);
   if(!isExist) return res.status(404).json({
        status: 'error',
        data: 'Book not found'
    });
   
    fs.unlink(`./uploads/${isExist.image}`,async(err)=>{
      await isExist.deleteOne();
      return res.status(200).json({
        status:'success',
        data: 'Book deleted successfully'
      })    
    })

   } catch (err) {
    return res.status(500).json({
        status: 'error',
        message: err.message
    })
    
   }
}