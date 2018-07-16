import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import UserIcon from '../elements/UserIcon.js';

class UserSectionItem extends React.Component {
  state = {
  }

  render() {
    const {
      onPress,
      user,
    } = this.props;

    return (
      <TouchableHighlight
        style={styles.container}
        onPress={onPress}
        underlayColor="transparent"
      >
        <View style={{ flexDirection: 'row' }}>
          <UserIcon
            // onPress
            photoURL={user.data.photoURL}
            dia={32}
            isAthlete={(user && user.data.isAthlete)}
          />
          <View style={styles.contents} >
            <Text
              style={[
                styles.userName,
              ]}
            >
              {`${user.data.name}`}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    // alignSelf: 'center',
    fontSize: 16,
    color: 'black',
  },
  contents: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default UserSectionItem;
