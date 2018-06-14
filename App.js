import React from 'react';
import firebase from 'firebase';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Login from './src/screens/Login.js';
import Home from './src/screens/Home.js';
import Nortification from './src/screens/Nortification.js';
import PhotoDetail from './src/screens/PhotoDetail.js';
import MyPageFun from './src/screens/MyPageFun.js';
import Signature from './src/screens/Signature.js';
import PhotoPicker from './src/screens/PhotoPicker.js';
import PhotoUploader from './src/screens/PhotoUploader.js';
import Schedule from './src/screens/Schedule.js';
import Game from './src/screens/Game.js';
import Team from './src/screens/Team.js';
import UserSearch from './src/screens/UserSearch.js';

import ENV from './env.json';

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


const HomeStack = createStackNavigator({
  Home: { screen: Home },
  Nortification: { screen: Nortification },
  MyPageFun: { screen: MyPageFun },
  PhotoDetail: { screen: PhotoDetail },
  Signature: { screen: Signature },
  Login: { screen: Login },
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
  Signature: { screen: Signature },
  MyPageFun: { screen: MyPageFun },
  Nortification: { screen: Nortification },
}, {
  headerMode: 'none',
});

const GameStack = createStackNavigator({
  Schedule: { screen: Schedule },
  Game: { screen: Game },
  Home: { screen: Home },
  MyPageFun: { screen: MyPageFun },
  Nortification: { screen: Nortification },
}, {
  headerMode: 'none',
});

const TeamStack = createStackNavigator({
  Team: { screen: Team },
  Home: { screen: Home },
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

const App = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarIcon: <MaterialCommunityIcon name="home" size={30} />,
      activeTintColor: '#e91e63',
    },
  },
  Game: {
    screen: GameStack,
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


export default App;
