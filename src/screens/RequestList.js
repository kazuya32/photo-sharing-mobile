import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import Header from '../components/Header.js';
import ReceivedRequests from '../components/ReceivedRequests.js';
import SentRequests from '../components/SentRequests.js';

class RequestList extends React.Component {
  state = {
    logInUser: this.props.navigation.state.params && this.props.navigation.state.params.logInUser,
  }

  componentWillMount() {
    // const { followingObject } = this.props;
  }

  // eslint-disable-next-line
  navigateToMyPage = () => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: this.state.logInUser.id,
        logInUser: this.state.logInUser,
      },
      key: 'UserPage' + this.state.logInUser.id,
    });
  }

  onPress = (request, user, photo) => {
    this.props.navigation.navigate({
      routeName: 'ViewRequest',
      params: {
        request,
        user,
        photo,
        logInUser: this.state.logInUser,
        // user: item,
      },
      key: 'ViewRequest' + request.id,
    });
  }

  render() {
    // eslint-disable-next-line
    const requests = this.props.navigation.state.params && this.props.navigation.state.params.requests;

    return (
      <View style={styles.container}>
        <Header
          // onPressLeft={() => { this.props.navigation.navigate({ routeName: 'UserPage' }); }}
          onPressLeft={this.navigateToMyPage}
          // onPressLeft={() => { this.setState({ uid: this.state.logInUid }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle="FLEGO"
        />
        <ScrollableTabView
          // renderTabBar={this.renderTabBar}
          style={styles.header}
          tabBarUnderlineStyle={styles.underline}
          tabBarBackgroundColor="#fff"
          tabBarActiveTextColor="#DB4D5E"
          tabBarInactiveTextColor="black"
          tabBarTextStyle={styles.tabBarText}
          tabStyle={{ paddingBottom: 0 }}
        >
          <ReceivedRequests
            tabLabel="受信"
            navigation={this.props.navigation}
            logInUser={this.state.logInUser}
            // numColumns={3}
            // horizontal={true}
          />
          <SentRequests
            tabLabel="送信"
            navigation={this.props.navigation}
            logInUser={this.state.logInUser}
            // numColumns={3}
            // horizontal={true}
          />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
  },
  header: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.5,
    // shadowRadius: 1,
    paddingTop: 10,
    borderBottomWidth: 0,
    paddingBottom: 0,
    // borderBottomColor: '#272C35',
  },
  underline: {
    backgroundColor: '#DB4D5E',
    borderWidth: 0,
    // height: 0,
    // borderBottomColor: '#DB4D5E',
  },
  activeTab: {
    borderColor: '#fff',
    borderWidth: 1,
  },
  tabBarText: {
    // alignSelf: 'center',
    // fontSize: 14,
    // borderWidth: 1,
  },
});

export default RequestList;
