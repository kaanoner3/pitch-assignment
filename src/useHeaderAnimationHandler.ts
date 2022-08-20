import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
} from 'react-native-reanimated';

const CONTENT_TITLE_OFFSET = 40;

const useHeaderAnimationHandler = () => {
  const headerTitleOpacity = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    if (event.contentOffset.y > CONTENT_TITLE_OFFSET) {
      headerTitleOpacity.value = 1;
    } else {
      headerTitleOpacity.value = 0;
    }
  });
  const headerTitleAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(headerTitleOpacity.value, {
        duration: 150,
      }),
    };
  }, [headerTitleOpacity.value]);

  return {scrollHandler, headerTitleOpacity: headerTitleAnimationStyle};
};

export default useHeaderAnimationHandler;
