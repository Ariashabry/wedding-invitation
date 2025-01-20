import express from 'express';
import wishesController from '../controllers/wishesController.js';

const wishesRouter = express.Router();

wishesRouter.get("/", wishesController.getWishes);
wishesRouter.post("/", wishesController.postWish);
wishesRouter.put("/:id", wishesController.updateWish);
wishesRouter.delete("/:id", wishesController.deleteWish);

export default wishesRouter; 