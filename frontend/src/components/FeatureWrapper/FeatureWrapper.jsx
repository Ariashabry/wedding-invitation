import { FEATURES } from '../../config/features';

const FeatureWrapper = ({ featureKey, children }) => {
  if (!FEATURES[featureKey]?.enabled) {
    return null;
  }

  return children;
};

export default FeatureWrapper; 