import React from 'react';
import firebase from 'firebase';
import { AsyncStorage, Easing, Animated } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Login from './src/screens/Login.js';
import Home from './src/screens/Home.js';
import TeamFeed from './src/screens/TeamFeed.js';
import MatchFeed from './src/screens/MatchFeed.js';
import Nortification from './src/screens/Nortification.js';
import PhotoDetail from './src/screens/PhotoDetail.js';
import SendRequest from './src/screens/SendRequest.js';
import UserPage from './src/screens/UserPage.js';
import EditProfile from './src/screens/EditProfile.js';
import RequestList from './src/screens/RequestList.js';
import ViewRequest from './src/screens/ViewRequest.js';
import Signature from './src/screens/Signature.js';
import PhotoPicker from './src/screens/PhotoPicker.js';
import PhotoUploader from './src/screens/PhotoUploader.js';
import Schedule from './src/screens/Schedule.js';
import Match from './src/screens/Match.js';
import Team from './src/screens/Team.js';
import UserSearch from './src/screens/UserSearch.js';
import SearchTag from './src/screens/SearchTag.js';
import SearchMatch from './src/screens/SearchMatch.js';

import ENV from './env.json';

// eslint-disable-next-line
require('firebase/firestore');
// eslint-disable-next-line
console.ignoredYellowBox = ['Remote debugger'];

// eslint-disable-next-line
const config = {
  apiKey:            ENV.FIREBASE_API_KEY,
  authDomain:        ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL:       ENV.FIREBASE_DB_URL,
  projectId:         ENV.FIREBASE_PROJECT_ID,
  storageBucket:     ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_SENDER_ID,
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    console.log('We are authenticated now!');

    const { // eslint-disable-next-line
      displayName,    // eslint-disable-next-line
      email, // eslint-disable-next-line
      emailVerified, // eslint-disable-next-line
      photoURL, // eslint-disable-next-line
      isAnonymous,
      uid, // eslint-disable-next-line
      providerData,
    } = user;

    // this.setState({
    //   displayName,
    //   email,
    //   emailVerified,
    //   photoURL,
    //   isAnonymous,
    //   uid,
    //   providerData,
    // });

    try {
      await AsyncStorage.setItem('uid', uid);
      // await AsyncStorage.setItem('facebookId', providerData[0].uid);
    } catch (error) {
      console.log('failed to saving AsyncStorage');
    }

  // eslint-disable-next-line
  } else {
    console.log('not login');
    // this.props.navigation.navigate({ routeName: 'Login' });
  }
});

const HomeStack = createStackNavigator({
  Home: { screen: Home },
  TeamFeed: { screen: TeamFeed },
  MatchFeed: { screen: MatchFeed },
  Nortification: { screen: Nortification },
  UserPage: { screen: UserPage },
  EditProfile: { screen: EditProfile },
  PhotoDetail: { screen: PhotoDetail },
  SendRequest: { screen: SendRequest },
  RequestList: { screen: RequestList },
  ViewRequest: { screen: ViewRequest },
  Signature: { screen: Signature },
  PhotoPicker: { screen: PhotoPicker },
  PhotoUploader: { screen: PhotoUploader },
}, {
  headerMode: 'none',
  // mode: 'modal',
  navigationOptions: {
    gesturesEnabled: true,
    // gestureResponseDistance: {
    //   horizontal: 50,
    // },
    // transitionConfig: () => ({
    //   transitionSpec: {
    //     duration: 300,
    //     easing: Easing.out(Easing.poly(4)),
    //     timing: Animated.timing,
    //   },
    //   screenInterpolator: sceneProps => {
    //     const { layout, position, scene } = sceneProps;
    //     const { index } = scene;
    //
    //     const height = layout.initHeight;
    //     const translateY = position.interpolate({
    //       inputRange: [index - 1, index, index + 1],
    //       outputRange: [height, 0, 0],
    //     });
    //
    //     const opacity = position.interpolate({
    //       inputRange: [index - 1, index - 0.99, index],
    //       outputRange: [0, 1, 1],
    //     });
    //
    //     return { opacity, transform: [{ translateY }] };
    //   },
    // }),
  //   headerTitle: 'FLEGO',
  //   headerStyle: {
  //     backgroundColor: '#FCFCFC',
  //     shadowColor: '#000',
  //     shadowOffset: { width: 0, height: 0 },
  //     shadowOpacity: 0.3,
  //     shadowRadius: 1,
  //     paddingRight: 14,
  //     paddingLeft: 14,
  //   },
  //   headerTitleStyle: {
  //     color: '#000000',
  //   },
  //   headerTintColor: '#fff',
  //   headerBackTitle: '<',
  //   headerLeft: <FontAwesomeIcon name="user-circle-o" size={24} />,
  //   headerRight: <MaterialCommunityIcon name="bell-outline" size={24} />,
  },
});

const UploadStack = createStackNavigator({
  PhotoPicker: { screen: PhotoPicker },
  PhotoUploader: { screen: PhotoUploader },
  SearchTag: { screen: SearchTag },
  SearchMatch: { screen: SearchMatch },
  Signature: { screen: Signature },
  UserPage: { screen: UserPage },
  EditProfile: { screen: EditProfile },
  Nortification: { screen: Nortification },
}, {
  headerMode: 'none',
});

const MatchStack = createStackNavigator({
  Schedule: { screen: Schedule },
  Match: { screen: Match },
  Home: { screen: Home },
  UserPage: { screen: UserPage },
  EditProfile: { screen: EditProfile },
  Nortification: { screen: Nortification },
}, {
  headerMode: 'none',
});

const TeamStack = createStackNavigator({
  Team: { screen: Team },
  TeamFeed: { screen: TeamFeed },
  UserPage: { screen: UserPage },
  EditProfile: { screen: EditProfile },
  Nortification: { screen: Nortification },
}, {
  headerMode: 'none',
});

const PlayerStack = createStackNavigator({
  UserSearch: { screen: UserSearch },
  UserPage: { screen: UserPage },
  EditProfile: { screen: EditProfile },
  Nortification: { screen: Nortification },
}, {
  headerMode: 'none',
});

const ServiceStack = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarIcon: <MaterialCommunityIcon name="home" size={30} />,
      activeTintColor: '#e91e63',
    },
  },
  Match: {
    screen: MatchStack,
    navigationOptions: {
      tabBarIcon: <EntypoIcon name="calendar" size={24} />,
    },
  },
  Player: {
    screen: PlayerStack,
    navigationOptions: {
      tabBarIcon: <EntypoIcon name="users" size={24} />,
    },
  },
  Team: {
    screen: TeamStack,
    navigationOptions: {
      tabBarIcon: <EntypoIcon name="sports-club" size={24} />,
    },
  },
  Upload: {
    screen: UploadStack,
    navigationOptions: {
      tabBarIcon: <FeatherIcon name="plus-circle" size={30} />,
    },
  },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 20,
    },
    style: {
      backgroundColor: '#FCFCFC',
    },
    showLabel: false,
    activeTintColor: '#e91e63',
    tabStyle: {
      // alignself: 'center',
    },
  },
});

const App = createStackNavigator({
  Auth: { screen: Login },
  Home: HomeStack,
}, {
  headerMode: 'none',
});


export default App;
