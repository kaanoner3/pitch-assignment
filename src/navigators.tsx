import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactDetail from './pages/ContactDetail';
import ContactList from './pages/ContactList';

const CoreNavigator = () => {
  const CoreStack = createNativeStackNavigator();

  return (
    <CoreStack.Navigator initialRouteName="ContactList">
      <CoreStack.Screen name="ContactList" component={ContactList} />
      <CoreStack.Screen name="ContactDetail" component={ContactDetail} />
    </CoreStack.Navigator>
  );
};

export default CoreNavigator;
