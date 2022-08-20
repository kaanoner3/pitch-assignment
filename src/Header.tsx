import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

export interface HeaderProps {
  headerLeft?: JSX.Element;
  headerRight?: JSX.Element;
  title?: string;
  titleOpacity?: {opacity: number};
}

export const Header: React.FC<HeaderProps> = ({
  headerLeft,
  headerRight,
  title,
  titleOpacity,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>{headerLeft ? headerLeft : null}</View>
      <Animated.View
        style={{
          ...styles.headerTitle,
          ...titleOpacity,
        }}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
      <View style={styles.headerRight}>{headerRight ? headerRight : null}</View>
    </View>
  );
};

export default Header;

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 44,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    shadowColor: '#f6f6f6',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  headerTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
  },
  headerText: {
    textAlign: 'center',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: '600',
  },
});
