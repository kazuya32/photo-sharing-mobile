import { createStackNavigator } from 'react-navigation';

import Login from './src/screens/Login.js';
import PhotoDetail from './src/screens/PhotoDetail.js';

const App = createStackNavigator({
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
