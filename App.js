import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Login from './src/screens/Login.js';
import PhotoDetail from './src/screens/PhotoDetail.js';
import MyPageFun from './src/screens/MyPageFun.js';
import Signature from './src/screens/Signature.js';
import PhotoPicker from './src/screens/PhotoPicker.js';

const HomeStack = createStackNavigator({
  MyPageFun: { screen: MyPageFun },
  PhotoDetail: { screen: PhotoDetail },
  Signature: { screen: Signature },
  Login: { screen: Login },
}, {
  navigationOptions: {
    headerTitle: 'FLEGO',
    headerStyle: {
      backgroundColor: '#FCFCFC',
    },
    headerTitleStyle: {
      color: '#000000',
    },
    headerTintColor: '#fff',
    headerBackTitle: null,
  },
});


const GameStack = createStackNavigator({
  PhotoDetail: { screen: PhotoDetail },
  MyPageFun: { screen: MyPageFun },
  Signature: { screen: Signature },
}, {
  navigationOptions: {
    headerTitle: 'FLEGO',
    headerStyle: {
      backgroundColor: '#FCFCFC',
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
  PhotoPicker: { screen: PhotoPicker },
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
