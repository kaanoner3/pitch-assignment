import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ListRenderItem,
  TouchableOpacity,
  SectionList,
  SectionListData,
} from 'react-native';
import ContactNativeModule from '../ContactsNativeModule';
import {ContactListNavigationProp} from '../navigators';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {contactSectionListState, contactState} from '../recoilSetup';

const ContactList: React.FC = () => {
  const setContacts = useSetRecoilState(contactState);
  const contacts = useRecoilValue<
    SectionListData<Contact, SectionListContactData>[]
  >(contactSectionListState);
  const navigation = useNavigation<ContactListNavigationProp>();

  React.useEffect(() => {
    ContactNativeModule.getContacts()
      .then((response: Contact[]) => {
        setContacts(response);
      })
      .catch((err: unknown) => console.log(err));
  }, [setContacts]);

  const renderItem: ListRenderItem<Contact> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ContactDetail', {contactId: item.id})
        }
        style={styles.itemContainer}>
        <Text style={styles.firstName}>{item.firstName}</Text>
        <Text style={styles.lastName}>{item.lastName}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <SectionList
        sections={contacts}
        renderItem={renderItem}
        style={styles.flatList}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeader}>{title}</Text>
          </View>
        )}
        SectionSeparatorComponent={() => (
          <View style={styles.sectionTitleSeperator} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  flatList: {flex: 1, backgroundColor: '#fff'},

  sectionHeader: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    color: '#7c8ba3',
  },
  sectionHeaderContainer: {
    backgroundColor: '#f6f6f6',
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  separator: {height: 1, backgroundColor: 'rgba(0,0,0,0.1)'},
  sectionTitleSeperator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: -16,
  },

  firstName: {fontSize: 16, color: '#000'},
  lastName: {fontSize: 16, marginLeft: 5, fontWeight: 'bold'},
  itemContainer: {flexDirection: 'row', paddingVertical: 10},
  safeArea: {flex: 1, backgroundColor: '#f6f6f6'},
});
