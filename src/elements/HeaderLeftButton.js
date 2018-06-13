import React from 'react';
import { TouchableHighlight } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class HeaderLeftButton extends React.Component {
  render() {
    const { onPress } = this.props;

    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor="transparent"
      >
        <FontAwesomeIcon name="user-circle-o" size={24} />
      </TouchableHighlight>
    );
  }
}

export default HeaderLeftButton;
