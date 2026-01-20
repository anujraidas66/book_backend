import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        unique: true
    },
    author: {
        type: String,
        required: [true, 'Author name is required']
    },
    image: {
        type: String,
        required: [true, 'Book image is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    description:{
        type: String,
        required: [true, 'Description is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required']
    }
    
},{timestamps: true});

export const Book = mongoose.model('Book', bookSchema);