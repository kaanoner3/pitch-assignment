import * as React from 'react';
import {Alert, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface DummyActionButtonProps {
  iconName: string;
  onPress?: () => void;
  title: string;
}

const DummyActionButton: React.FC<DummyActionButtonProps> = ({
  iconName,
  title,
  onPress = () =>
    Alert.alert(
      'Not implemented',
      'This functionality has not been implemented yet!',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    ),
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={iconName} size={20} color="#0785e6" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default DummyActionButton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    height: 60,
    width: 80,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#0785e6',
    fontWeight: '600',
    marginTop: 5,
  },
});
