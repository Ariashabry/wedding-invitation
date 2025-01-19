import { useFeatureFlag } from '../../hooks/useFeatureFlag';

const FeatureWrapper = ({ featureKey, children }) => {
    const isEnabled = useFeatureFlag(featureKey);

    if (!isEnabled) {
        return null;
    }

    return children;
};

export default FeatureWrapper; 