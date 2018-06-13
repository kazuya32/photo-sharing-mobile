import React from 'react';
import { TouchableHighlight } from 'react-native';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class HeaderRightButton extends React.Component {
  render() {
    const { onPress } = this.props;

    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor="transparent"
      >
        <MaterialCommunityIcon name="bell-outline" size={24} />
      </TouchableHighlight>
    );
  }
}

export default HeaderRightButton;
