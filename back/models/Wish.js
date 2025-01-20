import { Schema, model } from "mongoose";

let collection = 'wishes';

let wishSchema = new Schema({
   name: { type: String, required: true },
   message: { type: String, required: true },
}, {
   timestamps: true
});

let Wish = model(collection, wishSchema);

export default Wish; 