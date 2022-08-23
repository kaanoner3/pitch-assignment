import * as React from 'react';
import {render} from '@testing-library/react-native';
import {View} from 'react-native';
import ContactList from '../src/pages/ContactList';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';

describe('Contentlist', () => {
  it('should run', () => {
    render(
      <NavigationContainer>
        <RecoilRoot>
          <ContactList />
        </RecoilRoot>
      </NavigationContainer>,
    );
  });
});
