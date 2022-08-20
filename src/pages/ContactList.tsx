import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import ContactNativeModule from '../ContactsNativeModule';
import Header from '../Header';
import {ContactListNavigationProp} from '../navigators';
import {AnimatedFlatList} from '../AnimationScrollContext';

const ListHeaderComponent = () => {
  return (
    <View style={styles.listHeaderContainer}>
      <Text style={styles.title}>Contacts</Text>
    </View>
  );
};

const ContactList: React.FC = () => {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const navigation = useNavigation<ContactListNavigationProp>();

  React.useEffect(() => {
    ContactNativeModule.getContacts()
      .then((response: Contact[]) => {
        setContacts(response);
      })
      .catch((err: unknown) => console.log(err));
  }, []);

  const renderItem: ListRenderItem<Contact> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ContactDetail', {contact: item})}
        style={styles.itemContainer}>
        <Text style={styles.firstName}>{item.firstName}</Text>
        <Text style={styles.lastName}>{item.lastName}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Contacts" />
      <AnimatedFlatList
        data={contacts}
        renderItem={renderItem}
        style={styles.flatList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={ListHeaderComponent}
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
    paddingTop: 10,
    paddingBottom: 50,
  },
  flatList: {flex: 1, backgroundColor: '#fff'},
  title: {
    width: '100%',
    textAlign: 'left',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  separator: {height: 1, backgroundColor: 'rgba(0,0,0,0.2)'},
  listHeaderContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstName: {fontSize: 16, color: '#000'},
  lastName: {fontSize: 16, marginLeft: 5, fontWeight: 'bold'},
  itemContainer: {flexDirection: 'row', paddingVertical: 10},
  safeArea: {flex: 1, backgroundColor: '#f6f6f6'},
});
