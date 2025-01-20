import FeatureFlag from '../models/FeatureFlag.js';

const featureFlagsController = {
    getFeatures: async (req, res) => {
        try {
            const features = await FeatureFlag.find();
            console.log('Raw features from DB:', features);

            if (!Array.isArray(features)) {
                throw new Error('Features from DB is not an array');
            }
            
            // Convertir array a objeto con el formato esperado
            const featuresObject = features.reduce((acc, feature) => {
                if (!feature.name) {
                    console.warn('Feature without name:', feature);
                    return acc;
                }

                acc[feature.name] = {
                    enabled: Boolean(feature.enabled),
                    description: feature.description || 'Sin descripción',
                    updatedAt: feature.updatedAt || new Date()
                };
                return acc;
            }, {});
            
            console.log('Formatted features object:', featuresObject);

            if (Object.keys(featuresObject).length === 0) {
                console.warn('No features found or all features were invalid');
            }

            res.status(200).json(featuresObject);
        } catch (error) {
            console.error('Error in getFeatures:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Error al obtener los features',
                details: error.message 
            });
        }
    },

    updateFeatures: async (req, res) => {
        try {
            const features = req.body;
            console.log('Received update request:', features);
            
            if (!features || typeof features !== 'object') {
                throw new Error('Invalid features format received');
            }

            for (const [name, data] of Object.entries(features)) {
                if (!name || typeof data !== 'object') {
                    console.warn('Skipping invalid feature:', { name, data });
                    continue;
                }

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
            
            // Devolver los features actualizados
            const updatedFeatures = await FeatureFlag.find();
            const featuresObject = updatedFeatures.reduce((acc, feature) => {
                acc[feature.name] = {
                    enabled: Boolean(feature.enabled),
                    description: feature.description || 'Sin descripción',
                    updatedAt: feature.updatedAt
                };
                return acc;
            }, {});

            res.json({ 
                success: true, 
                features: featuresObject 
            });
        } catch (error) {
            console.error('Error in updateFeatures:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Error al actualizar los features',
                details: error.message 
            });
        }
    }
};

export default featureFlagsController; 