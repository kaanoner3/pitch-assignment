import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const HEADER_HEIGHT = 44;
const SCALE_LOST = 60;

const useContanctDetailAnimationHandler = () => {
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    const offsetY = event.contentOffset.y;
    // Added scrollView content offset value to normalize the translation value
    translationY.value = offsetY + 80;
    console.log(offsetY);
  });

  const transformStyleActionBox = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translationY.value,
            [0, 80],
            //Action box needs to transform more due to scale lost
            [0, -SCALE_LOST / 2],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [translationY.value]);
  const scaleAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            translationY.value,
            [0, 80],
            [1, 0.5],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [translationY.value]);

  const animationUserInfoBox = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translationY.value,
            [0, 80],
            [0, -(HEADER_HEIGHT + SCALE_LOST / 2)],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [translationY.value]);

  return {
    scrollHandler,
    scaleAnimation,
    animationUserInfoBox,
    transformStyleActionBox,
  };
};

export default useContanctDetailAnimationHandler;
