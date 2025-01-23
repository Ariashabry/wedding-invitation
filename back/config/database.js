import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO)
   .then(() => {
      if (process.env.NODE_ENV !== 'production') {
         console.log('Database connected successfully');
      }
   })
   .catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
         console.error('Database connection error:', err);
      }
   });
