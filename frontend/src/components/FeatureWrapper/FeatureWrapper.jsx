import { useFeatureFlag } from '../../hooks/useFeatureFlag';

const FeatureWrapper = ({ children, featureKey }) => {
    const isEnabled = useFeatureFlag(featureKey);

    if (!isEnabled) {
        return null;
    }

    return (
        <>
            {children}
        </>
    );
};

export default FeatureWrapper; 