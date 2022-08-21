import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import ContactDetail from './pages/ContactDetail';
import ContactList from './pages/ContactList';

export type CoreStackParamList = {
  ContactList: undefined;
  ContactDetail: {contactId: string};
};
export type ContactListNavigationProp = NativeStackNavigationProp<
  CoreStackParamList,
  'ContactDetail'
>;
const CoreNavigator = () => {
  const CoreStack = createNativeStackNavigator<CoreStackParamList>();

  return (
    <CoreStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ContactList">
      <CoreStack.Screen name="ContactList" component={ContactList} />
      <CoreStack.Screen name="ContactDetail" component={ContactDetail} />
    </CoreStack.Navigator>
  );
};

export default CoreNavigator;
