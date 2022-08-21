import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DummyNoteArea: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Note</Text>
    </View>
  );
};
export default DummyNoteArea;

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
});
