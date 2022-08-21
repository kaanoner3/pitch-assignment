import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

const MAX_OFFSET = 82;

const useContanctDetailAnimationHandler = () => {
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    const offsetY = event.contentOffset.y;
    if (offsetY > 0) {
      if (offsetY > MAX_OFFSET) {
        translationY.value = -MAX_OFFSET;
      } else {
        translationY.value = -offsetY;
      }
    } else {
      translationY.value = 0;
    }
  });
  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: withTiming(translationY.value, {duration: 100})},
      ],
    };
  }, [translationY.value]);
  const transformStyleActionBox = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: withTiming(translationY.value * 0.3, {duration: 100})},
      ],
    };
  }, [translationY.value]);
  const userInfoHeight = useAnimatedStyle(() => {
    return {
      height: withTiming(
        interpolate(translationY.value, [0, -81], [220, 100]),
        {
          duration: 100,
        },
      ),
    };
  }, [translationY.value]);
  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(
            interpolate(translationY.value, [0, -81], [1, 0.6]),
            {duration: 100},
          ),
        },
      ],
    };
  }, [translationY.value]);

  return {
    scrollHandler,
    animationTransformStyle: transformStyle,
    animationScaleStyle: scaleStyle,

    transformStyleActionBox,
    userInfoHeight,
  };
};

export default useContanctDetailAnimationHandler;
