import React from 'react';
import {
  StyleSheet,
  View,
  SectionList,
} from 'react-native';

import Header from '../components/Header.js';
import NortificationHeader from '../components/NortificationHeader.js';
import NortificationItem from '../components/NortificationItem.js';


class Nortification extends React.Component {
  state = {
    sections: [
      { title: 'Today', data: ['nortification1', 'nortification2'] },
      { title: 'This Week', data: ['nortification4', 'nortification4'] },
      { title: 'This Month', data: ['nortification5', 'nortification6'] },
    ],
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item, index, section }) {
    return (
      <NortificationItem item={item} />
    );
  }

  renderSectionHeader({ section }) {
    return (
      <NortificationHeader title={section.title} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() => { this.props.navigation.navigate({ routeName: 'UserPage' }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle="FLEGO"
        />
        <SectionList
          renderItem={this.renderItem.bind(this)}
          renderSectionHeader={this.renderSectionHeader.bind(this)}
          sections={this.state.sections}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#fff',
  },
});

export default Nortification;
