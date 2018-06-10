import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Login from './src/screens/Login.js';
import Home from './src/screens/Home.js';
import PhotoDetail from './src/screens/PhotoDetail.js';
import MyPageFun from './src/screens/MyPageFun.js';
import Signature from './src/screens/Signature.js';
import PhotoPicker from './src/screens/PhotoPicker.js';
import PhotoUploader from './src/screens/PhotoUploader.js';

const HomeStack = createStackNavigator({
  Home: { screen: Home },
  MyPageFun: { screen: MyPageFun },
  PhotoDetail: { screen: PhotoDetail },
  Signature: { screen: Signature },
  Login: { screen: Login },
}, {
  navigationOptions: {
    headerTitle: 'FLEGO',
    headerStyle: {
      backgroundColor: '#FCFCFC',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 1,
    },
    headerTitleStyle: {
      color: '#000000',
    },
    headerTintColor: '#fff',
    headerBackTitle: null,
  },
});

const UploadStack = createStackNavigator({
  PhotoPicker: { screen: PhotoPicker },
  PhotoUploader: { screen: PhotoUploader },
}, {
  headerMode: 'none',
});

const GameStack = createStackNavigator({
  MyPageFun: { screen: MyPageFun },
  PhotoDetail: { screen: PhotoDetail },
  Signature: { screen: Signature },
}, {
  navigationOptions: {
    headerTitle: 'FLEGO',
    headerStyle: {
      backgroundColor: '#FCFCFC',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 1,
    },
    headerTitleStyle: {
      color: '#000000',
    },
    headerTintColor: '#fff',
    headerBackTitle: '<',
  },
});

const TeamStack = createStackNavigator({
  Signature: { screen: Signature },
  MyPageFun: { screen: MyPageFun },
  PhotoDetail: { screen: PhotoDetail },
}, {
  navigationOptions: {
    headerTitle: 'FLEGO',
    headerStyle: {
      backgroundColor: '#FCFCFC',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 1,
    },
    headerTitleStyle: {
      color: '#000000',
    },
    headerTintColor: '#fff',
    headerBackTitle: '<',
  },
});

const App = createBottomTabNavigator({
  Home: HomeStack,
  Game: GameStack,
  Upload: UploadStack,
  Sign: TeamStack,
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 20,
    },
    style: {
      backgroundColor: '#FCFCFC',
    },
  },
});

export default App;
