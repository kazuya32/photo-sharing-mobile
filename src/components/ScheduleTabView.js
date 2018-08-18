import React from 'react';
import { StyleSheet } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import ScheduleCategory from './ScheduleCategory.js';

class ScheduleTabView extends React.Component {
  state = {
  }

  render() {
    const { onPressMatch } = this.props; // onPressは呼び出し元のスクリーンによって挙動が変わるため

    return (
      <ScrollableTabView
        // renderTabBar={this.renderTabBar}
        style={[
          styles.header,
        ]}
        tabBarUnderlineStyle={styles.underline}
        tabBarBackgroundColor="#fff"
        tabBarActiveTextColor="black"
        tabBarInactiveTextColor="black"
        tabBarTextStyle={styles.tabBarText}
        tabStyle={{ paddingBottom: 0 }}
      >
        <ScheduleCategory
          tabLabel="J1"
          category="J1"
          navigation={this.props.navigation}
          onPressMatch={onPressMatch}
        />
        <ScheduleCategory
          tabLabel="J2"
          category="J2"
          navigation={this.props.navigation}
          onPressMatch={onPressMatch}
        />
        <ScheduleCategory
          tabLabel="J3"
          category="J3"
          navigation={this.props.navigation}
          onPressMatch={onPressMatch}
        />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  teams: {
    // zIndex: 100,
  },
  header: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginTop: 16,
  },
  underline: {
    // backgroundColor: '#DB4D5E',
    backgroundColor: '#fff',
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

export default ScheduleTabView;
