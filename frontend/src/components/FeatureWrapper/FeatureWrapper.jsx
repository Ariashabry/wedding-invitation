import { useFeatureFlag } from '../../hooks/useFeatureFlag';

const FeatureWrapper = ({ children, featureKey }) => {
    const { isEnabled, isLoading } = useFeatureFlag(featureKey);

    if (isLoading || !isEnabled) {
        return null;
    }

    return children;
};

export default FeatureWrapper; 