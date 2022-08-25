import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ListRenderItem,
  TouchableOpacity,
  SectionList,
  SectionListData,
  SectionListProps,
  TextInput,
  FlatList,
} from 'react-native';
import ContactNativeModule from '../ContactsNativeModule';
import {ContactListNavigationProp} from '../navigators';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
  contactFilterBySearchText,
  contactSectionListState,
  contactState,
} from '../recoilSetup';
import Header from '../components/Header';
import useHeaderAnimationHandler, {
  CONTENT_TITLE_HIGHT,
  SECTIONLIST_INSET,
} from '../hooks/useHeaderAnimationHandler';
import Animated, {AnimateProps} from 'react-native-reanimated';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const HEADER_HIGHT = 44;
const SEARCH_CONTAINER_HEIGHT = 40;
const AnimatedSectionList =
  Animated.createAnimatedComponent<
    SectionListProps<Contact, SectionListContactData>
  >(SectionList);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const NoResultComponent = () => (
  <View style={styles.noResultContainer}>
    <Text style={styles.noResultText}>No Result</Text>
  </View>
);

const ContactList: React.FC = () => {
  const setContacts = useSetRecoilState(contactState);
  const contacts = useRecoilValue<
    SectionListData<Contact, SectionListContactData>[]
  >(contactSectionListState);
  const [searchText, setSearchText] = React.useState('');
  const searchedContacts = useRecoilValue(
    contactFilterBySearchText(searchText),
  );
  const insets = useSafeAreaInsets();
  const textInputRef = React.useRef<TextInput>(null);
  const sectionListRef =
    React.useRef<
      React.Component<
        AnimateProps<SectionListProps<Contact, SectionListContactData>>
      >
    >(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const navigation = useNavigation<ContactListNavigationProp>();
  const {
    scrollHandler,
    headerTitleOpacity,
    translateYAnimation,
    cancelButtonAnimation,
    textInputAnimation,
    sectionListTranslationStyle,
  } = useHeaderAnimationHandler(isFocused);

  const onCancelPress = () => {
    textInputRef.current?.blur();
    setSearchText('');
  };

  React.useEffect(() => {
    ContactNativeModule.getContacts()
      .then((response: Contact[]) => {
        setContacts(response);
      })
      .catch(_ => new Error('Error occured while fetching contacts'));
  }, [setContacts]);

  const renderItem: ListRenderItem<Contact> = ({item}) => {
    return (
      <TouchableOpacity
        testID="contact-item"
        onPress={() =>
          navigation.navigate('ContactDetail', {contactId: item.id})
        }
        style={styles.itemContainer}>
        <Text style={styles.firstName}>{item.firstName}</Text>
        <Text style={styles.lastName}>{item.lastName}</Text>
      </TouchableOpacity>
    );
  };
  const renderPageTitle = () => {
    return (
      <Animated.View
        style={[
          styles.pageTitleContainer,
          {top: HEADER_HIGHT + insets.top},
          {...translateYAnimation},
        ]}>
        <Text style={styles.title}>Contacts</Text>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        bgColor="#f6f6f6"
        title="Contacts"
        titleOpacity={headerTitleOpacity}
      />
      {renderPageTitle()}
      <Animated.View
        style={[
          styles.searchInputContainer,
          {top: HEADER_HIGHT + insets.top + CONTENT_TITLE_HIGHT},
          {...translateYAnimation},
        ]}>
        <AnimatedTextInput
          testID="search-input"
          ref={textInputRef}
          placeholder="Search"
          placeholderTextColor="#000"
          style={[styles.textInput, {...textInputAnimation}]}
          onChangeText={setSearchText}
          value={searchText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Animated.Text
          testID="cancel-button"
          onPress={onCancelPress}
          style={{...cancelButtonAnimation}}>
          Cancel
        </Animated.Text>
      </Animated.View>

      <AnimatedSectionList
        testID="sectionList"
        keyExtractor={(item, index) => `${item.id}-${index}`}
        sections={contacts}
        renderItem={renderItem}
        ref={sectionListRef}
        style={[styles.sectionListContainer, {...sectionListTranslationStyle}]}
        ListEmptyComponent={NoResultComponent}
        showsVerticalScrollIndicator={false}
        contentInset={{top: SECTIONLIST_INSET}}
        onScroll={scrollHandler}
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
      {searchText.length > 0 && (
        <FlatList
          testID="flatlist"
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          style={[
            styles.searchListContainer,
            {
              top: HEADER_HIGHT + SEARCH_CONTAINER_HEIGHT + insets.top,
            },
          ]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.searchListContentContainer}
          data={searchedContacts}
        />
      )}
    </SafeAreaView>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  sectionListContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

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
  safeArea: {
    flex: 1,
  },
  title: {
    width: '100%',
    textAlign: 'left',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  pageTitleContainer: {
    height: 60,
    width: '100%',
    backgroundColor: '#f6f6f6',
    position: 'absolute',
    zIndex: 2,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInputContainer: {
    height: 40,
    backgroundColor: '#fff',
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    zIndex: 2,
    left: 0,
    right: 0,
  },
  textInput: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    zIndex: 444,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 5,
  },
  noResultText: {
    fontSize: 36,
    fontWeight: '500',
  },
  noResultContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchListContainer: {
    position: 'absolute',
    zIndex: 99999,
    backgroundColor: '#fff',
    right: 0,
    left: 0,
    bottom: 0,
  },
  searchListContentContainer: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
});
