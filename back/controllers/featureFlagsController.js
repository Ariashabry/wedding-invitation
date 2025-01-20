import FeatureFlag from '../models/FeatureFlag.js';

const featureFlagsController = {
    getFeatures: async (req, res) => {
        try {
            const features = await FeatureFlag.find();
            const featuresObject = features.reduce((acc, feature) => {
                if (feature.name) {
                    acc[feature.name] = {
                        enabled: Boolean(feature.enabled),
                        description: feature.description || 'Sin descripción',
                        updatedAt: feature.updatedAt || new Date()
                    };
                }
                return acc;
            }, {});
            
            res.status(200).json(featuresObject);
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                error: 'Error al obtener los features'
            });
        }
    },

    updateFeatures: async (req, res) => {
        try {
            const features = req.body;
            
            if (!features || typeof features !== 'object') {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Formato inválido' 
                });
            }

            for (const [name, data] of Object.entries(features)) {
                if (name && typeof data === 'object') {
                    await FeatureFlag.findOneAndUpdate(
                        { name },
                        { 
                            name,
                            enabled: Boolean(data.enabled),
                            description: data.description || 'Sin descripción',
                            updatedAt: new Date()
                        },
                        { upsert: true, new: true }
                    );
                }
            }
            
            const updatedFeatures = await FeatureFlag.find();
            const featuresObject = updatedFeatures.reduce((acc, feature) => {
                acc[feature.name] = {
                    enabled: Boolean(feature.enabled),
                    description: feature.description || 'Sin descripción',
                    updatedAt: feature.updatedAt
                };
                return acc;
            }, {});

            res.json({ success: true, features: featuresObject });
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                error: 'Error al actualizar los features'
            });
        }
    }
};

export default featureFlagsController; 