import { useFeatureFlag } from '../../hooks/useFeatureFlag';

const FeatureWrapper = ({ children, featureKey }) => {
    const { isEnabled, isLoading } = useFeatureFlag(featureKey);

    if (isLoading) return null;

    if (!isEnabled) {
        return null;
    }

    return children;
};

export default FeatureWrapper; 