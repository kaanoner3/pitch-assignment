import React from 'react';
import {
  FlatListProps,
  ImageStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
  AnimatedStyleProp,
} from 'react-native-reanimated';

interface ScrollContextInterface {
  headerTitleOpacity: {opacity: number};
  contactInfoAnimationStyles: AnimatedStyleProp<ViewStyle | ImageStyle>;
  scrollHandler(event: NativeSyntheticEvent<NativeScrollEvent>): void;
}

const CONTENT_TITLE_OFFSET = 40;
const SCROLL_EVENT_THROTTLE = 16;

export const ScrollContext = React.createContext<ScrollContextInterface>({
  headerTitleOpacity: {opacity: 0},
  contactInfoAnimationStyles: {},
  scrollHandler: () => {},
});

export const useScroller = () => React.useContext(ScrollContext);

export const ScrollContextAnimationProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const translationY = useSharedValue(0);
  const headerTitleOpacity = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
    if (translationY.value > CONTENT_TITLE_OFFSET) {
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

  // To animate contact's thumbnail and name in ContactDetail screen.
  const contactInfoAnimationStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translationY.value,
        },
      ],
    };
  }, [translationY.value]);

  return (
    <ScrollContext.Provider
      value={{
        contactInfoAnimationStyles,
        headerTitleOpacity: headerTitleAnimationStyle,
        scrollHandler,
      }}>
      {children}
    </ScrollContext.Provider>
  );
};

export function AnimatedScrollView(props: ScrollViewProps) {
  const {scrollHandler} = useScroller();

  return (
    <Animated.ScrollView
      {...props}
      onScroll={scrollHandler}
      scrollEventThrottle={SCROLL_EVENT_THROTTLE}>
      {props.children}
    </Animated.ScrollView>
  );
}
export function AnimatedFlatList<T>(props: FlatListProps<T>) {
  const {scrollHandler} = useScroller();

  return (
    <Animated.FlatList
      {...props}
      onScroll={scrollHandler}
      scrollEventThrottle={SCROLL_EVENT_THROTTLE}
    />
  );
}

export default ScrollContextAnimationProvider;
