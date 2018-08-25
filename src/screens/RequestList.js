import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import Header from '../components/Header.js';
import ReceivedItems from '../components/ReceivedItems.js';
import SentItems from '../components/SentItems.js';

class RequestList extends React.Component {
  state = {
    logInUser: this.props.navigation.state.params && this.props.navigation.state.params.logInUser,
  }

  componentWillMount() {
    // const { followingObject } = this.props;
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
          headerTitle="FLEGO"
          navigation={this.props.navigation}
          // logInUser={this.state.logInUser}
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
          <ReceivedItems
            tabLabel="受信"
            navigation={this.props.navigation}
          />
          <SentItems
            tabLabel="送信"
            navigation={this.props.navigation}
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
