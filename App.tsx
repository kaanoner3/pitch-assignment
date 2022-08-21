import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import CoreNavigator from './src/navigators';
import {RecoilRoot} from 'recoil';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <CoreNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
