import * as React from 'react';
import {Dimensions} from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

export const CONTENT_TITLE_OFFSET = 40;
export const CONTENT_TITLE_HIGHT = 60;
export const SECTIONLIST_INSET = 40;
const SCREEN_WIDTH = Dimensions.get('window').width;

const useHeaderAnimationHandler = (isInputFocued: boolean) => {
  const headerTitleOpacity = useSharedValue(0);
  const translationY = useSharedValue(0);
  const searchInputAnimationValue = useSharedValue(0);
  const lastScrollValue = useSharedValue(0);
  const sectionListTranslationY = useSharedValue(0);

  React.useEffect(() => {
    // Target scroll offset value of section list.
    // If header callapsed then don't need to transform section list It is already scrolled.
    // Otherwise transform section list by it's remaning scroll value
    // Ex. we scrolled 20 frame then we need additional 40
    const targetScrollValue =
      lastScrollValue.value > 60 ? 0 : 60 - lastScrollValue.value;

    // When we focus translateY if needed
    // When we blur translate to its initial position
    sectionListTranslationY.value = withTiming(
      isInputFocued ? targetScrollValue : 0,
      {
        duration: 250,
      },
    );

    if (isInputFocued) {
      headerTitleOpacity.value = 0;

      // To animate cancel button and textInput width
      searchInputAnimationValue.value = withTiming(1, {duration: 250});
      //When we focus we want the header collapsed
      translationY.value = withTiming(60, {duration: 250});
    } else {
      // To animate cancel button and textInput width
      searchInputAnimationValue.value = withTiming(0, {duration: 250});

      //When we blur we want to animate title&search input to its previous position
      translationY.value = withTiming(lastScrollValue.value, {duration: 250});

      headerTitleOpacity.value =
        lastScrollValue.value > CONTENT_TITLE_OFFSET ? 1 : 0;
    }
  }, [isInputFocued]);

  const scrollHandler = useAnimatedScrollHandler(event => {
    const offsetY = event.contentOffset.y + SECTIONLIST_INSET;
    // if focused we don't want to translate SectionList when user scroll
    !isInputFocued ? (translationY.value = offsetY) : null;

    // Keep track last scroll value in order to decide title&searchInput positions
    lastScrollValue.value = offsetY;

    if (isInputFocued) {
      headerTitleOpacity.value = 0;
    } else {
      if (translationY.value >= CONTENT_TITLE_OFFSET) {
        headerTitleOpacity.value = 1;
      } else {
        headerTitleOpacity.value = 0;
      }
    }
  });
  const sectionListTranslationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            sectionListTranslationY.value,
            [0, CONTENT_TITLE_HIGHT],
            [0, -CONTENT_TITLE_HIGHT],
          ),
        },
      ],
    };
  }, [sectionListTranslationY.value]);

  const headerTitleAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(headerTitleOpacity.value, {
        duration: 250,
      }),
    };
  }, [headerTitleOpacity.value]);

  const translateYAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translationY.value,
            [0, CONTENT_TITLE_HIGHT],
            [0, -CONTENT_TITLE_HIGHT],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [translationY.value]);

  const cancelButtonAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            searchInputAnimationValue.value,
            [0, 1],
            [30, 10],
          ),
        },
      ],
    };
  }, [searchInputAnimationValue.value]);

  const textInputAnimation = useAnimatedStyle(() => {
    return {
      width: interpolate(
        searchInputAnimationValue.value,
        [0, 1],
        [SCREEN_WIDTH - 20, SCREEN_WIDTH - 80],
      ),
    };
  }, [searchInputAnimationValue.value]);
  return {
    translateYAnimation,
    scrollHandler,
    cancelButtonAnimation,
    textInputAnimation,
    sectionListTranslationStyle,
    headerTitleOpacity: headerTitleAnimationStyle,
  };
};

export default useHeaderAnimationHandler;
