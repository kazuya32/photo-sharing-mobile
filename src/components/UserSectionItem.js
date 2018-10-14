import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import UserIcon from '../elements/UserIcon.js';

class UserSectionItem extends React.PureComponent {
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
            dia={40}
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
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    // alignSelf: 'center',
    fontSize: 20,
    color: 'black',
  },
  contents: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 24,
  },
});

export default UserSectionItem;
