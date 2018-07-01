import React from 'react';
import { TouchableHighlight } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import UserIcon from './UserIcon.js';

class HeaderLeftButton extends React.Component {
  render() {
    const { onPress, photoURL } = this.props;

    if (!photoURL) {
      return (
        <TouchableHighlight
          onPress={onPress}
          underlayColor="transparent"
        >
          <FontAwesomeIcon name="user-circle-o" size={24} />
        </TouchableHighlight>
      );
    }

    return (
      <UserIcon
        onPress={onPress}
        photoURL={photoURL}
        dia={32}
      />
    );
  }
}

export default HeaderLeftButton;
