
import jwt from 'jsonwebtoken';

export const checkUser = (req,res,next) => {
   const token = req.headers.authorization;
  
   if(!token) return res.status(401).json({
    status: 'error',
    data: 'you are not authorized'
   });

   try {
    const decode = jwt.verify(token,'secret');
    req.userId = decode.id;
    req.role = decode.role;
    next();
   } catch (err) {
    return res.status(401).json({
        status: 'error',
        message: err.message
    });
   }
  
}



export const checkAdmin = (req,res,next) =>{
    if(req.role === 'admin') return next();
    return res.status(401).json({
        status: 'error',
        message: 'you are not authorized'
    });
    
}