import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import CoreNavigator from './src/navigators';
import ScrollContextAnimationProvider from './src/AnimationScrollContext';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <ScrollContextAnimationProvider>
        <CoreNavigator />
      </ScrollContextAnimationProvider>
    </NavigationContainer>
  );
};

export default App;
