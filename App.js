import { createStackNavigator } from 'react-navigation';

import Login from './src/screens/Login.js';
import PhotoDetail from './src/screens/PhotoDetail.js';
import MyPageFun from './src/screens/MyPageFun.js';

const App = createStackNavigator({
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

export default App;
