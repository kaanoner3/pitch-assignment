import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import CoreNavigator from './src/navigators';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <CoreNavigator />
    </NavigationContainer>
  );
};

export default App;
