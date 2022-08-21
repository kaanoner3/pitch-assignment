import * as React from 'react';
import {Text, SafeAreaView, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import useContanctDetailAnimationHandler from '../hooks/useContactDetailAnimation';
import {CoreStackParamList} from '../navigators';
import DummyActionButton from '../components/DummActionButton';
import CustomButton from '../components/CustomButton';
import DummyNoteArea from '../components/DummyNoteArea';
import {useRecoilValue} from 'recoil';
import {contactFilterById} from '../recoil';

const ContactDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<CoreStackParamList, 'ContactDetail'>>();
  const {contactId} = route.params;
  const [contact] = useRecoilValue(contactFilterById(contactId));

  const {
    scrollHandler,
    userInfoHeight,
    animationTransformStyle,
    animationScaleStyle,
    transformStyleActionBox,
  } = useContanctDetailAnimationHandler();
  return (
    <SafeAreaView style={styles.containter}>
      <Header
        headerLeft={
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-back-outline"
            size={30}
            color="#000"
          />
        }
      />
      <Animated.View
        style={[styles.topContainer, animationTransformStyle, userInfoHeight]}>
        <Animated.View style={[styles.alignCenter, {...animationScaleStyle}]}>
          <View style={styles.contactInfoContainer}>
            <Text style={styles.contactFirstLatter}>
              {contact.firstName[0]}
            </Text>
          </View>
          <Text style={styles.contactNameText}>
            {contact.firstName} {contact.lastName}
          </Text>
        </Animated.View>
        <Animated.View
          style={[styles.actionBoxContainer, {...transformStyleActionBox}]}>
          <DummyActionButton title="Message" iconName="chatbox-outline" />
          <DummyActionButton title="Mobile" iconName="call-outline" />
          <DummyActionButton title="Video" iconName="camera-outline" />
          <DummyActionButton title="Mail" iconName="mail-outline" />
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.flexOne}
        contentContainerStyle={styles.contentContainer}>
        {contact.phoneNumbers?.map(phoneNumber => {
          const key = Object.keys(phoneNumber)[0];
          return (
            <View key={phoneNumber[key]} style={styles.scrollViewItemContainer}>
              <CustomButton label={key} text={phoneNumber[key]} />
            </View>
          );
        })}

        {contact.emailAddresses?.map(email => {
          const key = Object.keys(email)[0];
          return (
            <View key={email[key]} style={styles.scrollViewItemContainer}>
              <CustomButton label={key} text={email[key]} />
            </View>
          );
        })}
        <View key="note" style={styles.scrollViewItemContainer}>
          <DummyNoteArea />
        </View>
        {contact.birthday && (
          <View key={contact.birthday} style={styles.scrollViewItemContainer}>
            <CustomButton label="birthday" text={contact.birthday} />
          </View>
        )}
        <View key="Send Message" style={styles.scrollViewItemContainer}>
          <CustomButton text="Send Message" />
        </View>
        <View key="Share Contact" style={styles.scrollViewItemContainer}>
          <CustomButton text="Share Contact" />
        </View>
        <View key="Add to Favourites" style={styles.scrollViewItemContainer}>
          <CustomButton text="Add to Favourites" />
        </View>
        <View
          key="Add to Emergency Contact"
          style={styles.scrollViewItemContainer}>
          <CustomButton text="Add to Emergency Contact" />
        </View>
        <View key="Share My Location" style={styles.scrollViewItemContainer}>
          <CustomButton text="Share My Location" />
        </View>
        <View key="block" style={styles.scrollViewItemContainer}>
          <CustomButton textColor="red" text="Block" />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default ContactDetail;

const styles = StyleSheet.create({
  containter: {flex: 1, backgroundColor: '#f1f1f1'},
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  scrollViewItemContainer: {marginTop: 10},
  contactNameText: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#000',
  },
  actionBoxContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 5,

    justifyContent: 'space-between',
  },
  contactInfoContainer: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#a19e97',
    justifyContent: 'center',
    borderRadius: 40,
  },
  topContainer: {
    marginTop: 10,
    alignItems: 'center',
    zIndex: 1,
  },
  flexOne: {flex: 1},
  contactFirstLatter: {color: '#fff', fontSize: 40},
  alignCenter: {justifyContent: 'center', alignItems: 'center'},
});
