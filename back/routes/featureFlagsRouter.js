import express from 'express';
import featureFlagsController from '../controllers/featureFlagsController.js';

const featureFlagsRouter = express.Router();

featureFlagsRouter.get("/", featureFlagsController.getFeatures);
featureFlagsRouter.post("/", featureFlagsController.updateFeatures);

export default featureFlagsRouter; 