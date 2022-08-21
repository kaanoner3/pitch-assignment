import * as React from 'react';
import {Text, SafeAreaView, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import Header from '../Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import useContanctDetailAnimationHandler from '../useContactDetailAnimation';
import {CoreStackParamList} from '../navigators';
import DummyActionButton from '../components/DummActionButton';
import CustomButton from '../components/CustomButton';

const ContactDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<CoreStackParamList, 'ContactDetail'>>();
  const {contact} = route.params;
  console.log('contact', contact);
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
        scrollEventThrottle={1}
        style={{
          height: '100%',
        }}
        contentContainerStyle={styles.contentContainer}>
        {contact.phoneNumbers.map(phoneNumber => {
          const key = Object.keys(phoneNumber)[0];
          return (
            <View style={{marginTop: 10}}>
              <CustomButton label={key} text={phoneNumber[key]} />
            </View>
          );
        })}

        {contact.emailAddresses.map(email => {
          const key = Object.keys(email)[0];
          return (
            <View style={{marginTop: 10}}>
              <CustomButton label={key} text={email[key]} />
            </View>
          );
        })}

        {contact.birthday && (
          <View style={{marginTop: 10}}>
            <CustomButton label="birthday" text={contact.birthday} />
          </View>
        )}
        <View style={{marginTop: 10}}>
          <CustomButton text="Send Message" />
        </View>
        <View style={{marginTop: 10}}>
          <CustomButton text="Share Contact" />
        </View>
        <View style={{marginTop: 10}}>
          <CustomButton text="Add to Favourites" />
        </View>
        <View style={{marginTop: 10}}>
          <CustomButton text="Add to Emergency Contact" />
        </View>
        <View style={{marginTop: 10}}>
          <CustomButton text="Share My Location" />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default ContactDetail;

const styles = StyleSheet.create({
  containter: {flex: 1, backgroundColor: '#f1f1f1'},
  contentContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 150,
  },
  dummyView: {
    marginHorizontal: 5,
    height: 60,
    width: 80,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  contactNameText: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#000',
  },
  paragraph: {
    marginVertical: 10,
    backgroundColor: '#fff',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 21,
    overflow: 'scroll',
  },
  headerText: {
    textAlign: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: '600',
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

  contactFirstLatter: {color: '#fff', fontSize: 40},
  alignCenter: {justifyContent: 'center', alignItems: 'center'},
});
