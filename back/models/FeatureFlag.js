import { Schema, model } from "mongoose";

let collection = 'featureflags';

let featureFlagSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    enabled: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now }
});

let FeatureFlag = model(collection, featureFlagSchema);

export default FeatureFlag; 