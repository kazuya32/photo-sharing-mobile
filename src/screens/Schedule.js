import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import Header from '../components/Header.js';
import ScheduleTabView from '../components/ScheduleTabView.js';

class Schedule extends React.Component {
  state = {
  }

  onPressMatch= (item) => {
    this.props.navigation.navigate({
      routeName: 'MatchFeed',
      params: {
        match: item,
      },
      key: 'MatchFeed' + item.id,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          headerTitle="Match Schedule"
          navigation={this.props.navigation}
          logInUser={this.state.logInUser}
        />
        <ScheduleTabView
          category="J1"
          navigation={this.props.navigation}
          onPressMatch={this.onPressMatch}
        />
      </View>
    );
  }
}

// <View style={styles.feedArea}>
//   <FlatList
//     data={this.state.schedules}
//     renderItem={this.renderItem}
//     keyExtractor={this.keyExtractor}
//   />
// </View>
// <Image
//   style={styles.bgImage}
//   source={BackgroundImage}
//   resizeMode="cover"
// />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  bgImage: {
    opacity: 0.8,
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  feedArea: {
    marginTop: 12,
    marginBottom: 12,
  },
});

export default Schedule;
