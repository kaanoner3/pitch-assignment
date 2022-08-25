import * as React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
//import {NativeModules} from 'react-native';
import ContactList from '../src/pages/ContactList';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';

export const MOCK_CONTACTS: Contact[] = [
  {
    id: '1',
    firstName: 'kaan',
    lastName: 'Oner',
    birthday: '17-02-1994',
    phoneNumbers: [{home: '123415415'}, {work: '123455511'}],
    emailAddresses: [{work: 'asdsa@asdass.com'}],
  },
  {
    id: '1',
    firstName: 'mehmet',
    lastName: 'berk',
    birthday: '17-02-1994',
    phoneNumbers: [{home: '123415415'}, {work: '123455511'}],
    emailAddresses: [{work: 'asdsa@asdass.com'}],
  },
  {
    id: '2',
    firstName: 'buse',
    lastName: 'Oner',
    birthday: '17-02-19943',
    phoneNumbers: [{home: '11111111'}, {work: '222222'}],
    emailAddresses: [{work: 'ffff@fff.com'}],
  },
];

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  const NativeModules = {
    ...RN.NativeModules,
    ContactNativeModule: {
      getContacts: jest.fn(() => Promise.resolve(MOCK_CONTACTS)),
    },
  };
  return Object.setPrototypeOf(
    {
      NativeModules,
    },
    RN,
  );
});
describe('Contentlist', () => {
  it('should render properly', async () => {
    const {getByTestId, getByPlaceholderText} = render(
      <NavigationContainer>
        <RecoilRoot>
          <ContactList />
        </RecoilRoot>
      </NavigationContainer>,
    );
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(getByTestId('sectionList')).toBeTruthy();
      expect(getByPlaceholderText('Search')).toBeTruthy();
    });
  });
  it('should display contacts on component did mount', async () => {
    const {getAllByTestId, getByText} = render(
      <NavigationContainer>
        <RecoilRoot>
          <ContactList />
        </RecoilRoot>
      </NavigationContainer>,
    );
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(getAllByTestId('contact-item').length).toBe(3);
      expect(getByText('kaan')).toBeTruthy();
      expect(getByText('buse')).toBeTruthy();
    });
  });
  it('should return contact(s) given search text', async () => {
    const {getAllByText, getByPlaceholderText, getByTestId} = render(
      <NavigationContainer>
        <RecoilRoot>
          <ContactList />
        </RecoilRoot>
      </NavigationContainer>,
    );
    const input = getByPlaceholderText('Search');
    fireEvent.changeText(input, 'kaan');
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      const flatList = getByTestId('flatlist');
      expect(flatList).toBeTruthy();
      // we dont remove sectionlist that's why we have 2 (1+1) contact-item
      expect(getAllByText('kaan').length).toBe(2);
    });
  });
});
