import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let uri_link = process.env.MONGO;
console.log('Connection string:', uri_link);

mongoose.connect(uri_link)
   .then(() => {
      console.log(' --> Database connected successfully <-- ');
   })
   .catch((err) => {
      console.log(err)
   })
