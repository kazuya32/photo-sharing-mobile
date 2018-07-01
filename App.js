import React from 'react';
import firebase from 'firebase';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Login from './src/screens/Login.js';
import Feed from './src/screens/Feed.js';
import TeamFeed from './src/screens/TeamFeed.js';
import MatchFeed from './src/screens/MatchFeed.js';
import Nortification from './src/screens/Nortification.js';
import PhotoDetail from './src/screens/PhotoDetail.js';
import MyPageFun from './src/screens/MyPageFun.js';
import Signature from './src/screens/Signature.js';
import PhotoPicker from './src/screens/PhotoPickerExpo.js';
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

firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log('We are authenticated now!');
  }
  console.log('not logiin');
});

const HomeStack = createStackNavigator({
  Home: { screen: Feed },
  TeamFeed: { screen: TeamFeed },
  MatchFeed: { screen: MatchFeed },
  Nortification: { screen: Nortification },
  MyPageFun: { screen: MyPageFun },
  PhotoDetail: { screen: PhotoDetail },
  Signature: { screen: Signature },
}, {
  headerMode: 'none',
  // navigationOptions: {
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
  // },
});

const UploadStack = createStackNavigator({
  PhotoPicker: { screen: PhotoPicker },
  PhotoUploader: { screen: PhotoUploader },
  SearchTag: { screen: SearchTag },
  SearchMatch: { screen: SearchMatch },
  Signature: { screen: Signature },
  MyPageFun: { screen: MyPageFun },
  Nortification: { screen: Nortification },
}, {
  headerMode: 'none',
});

const MatchStack = createStackNavigator({
  Schedule: { screen: Schedule },
  Match: { screen: Match },
  Feed: { screen: Feed },
  MyPageFun: { screen: MyPageFun },
  Nortification: { screen: Nortification },
}, {
  headerMode: 'none',
});

const TeamStack = createStackNavigator({
  Team: { screen: Team },
  TeamFeed: { screen: TeamFeed },
  MyPageFun: { screen: MyPageFun },
  Nortification: { screen: Nortification },
}, {
  headerMode: 'none',
});

const PlayerStack = createStackNavigator({
  UserSearch: { screen: UserSearch },
  MyPageFun: { screen: MyPageFun },
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
  Service: ServiceStack,
}, {
  headerMode: 'none',
});


export default App;
