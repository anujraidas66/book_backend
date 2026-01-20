
import express from 'express';
import { createBook, deleteBook, getAllBooks, getSingleBook, updateBook } from '../controllers/bookControllers.js';
import { notAllowed } from '../utils/notAllowed.js';
import { checkFile, updateCheckFile } from '../middlewares/checkFile.js';
import { checkId } from '../middlewares/checkId.js';
import { checkAdmin, checkUser } from '../middlewares/checkUser.js';
const router = express.Router();

router.route('/api/books')
.get(getAllBooks)
.post(checkUser,checkAdmin,checkFile,createBook).all(notAllowed);

router.route('/api/books/:id')
.get(checkId,getSingleBook)
.patch(checkId,updateCheckFile,updateBook)
.delete(checkId,deleteBook).all(notAllowed);


export default router;