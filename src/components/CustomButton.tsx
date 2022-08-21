import * as React from 'react';
import {TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';

interface CustomButtonProps {
  label?: string;
  text: string;
  onPress?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  text,
  onPress = () =>
    Alert.alert(
      'Not implemented',
      'This functionality has not been implemented yet!',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    ),
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {label && <Text>{label}</Text>}
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  textStyle: {
    color: '#0785e6',
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
});
