import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import Login from './src/screens/Login.js';
import PhotoDetail from './src/screens/PhotoDetail.js';
import MyPageFun from './src/screens/MyPageFun.js';
import Signature from './src/screens/Signature.js';

const HomeStack = createStackNavigator({
  MyPageFun: { screen: MyPageFun },
  PhotoDetail: { screen: PhotoDetail },
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
  Game: GameStack,
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
