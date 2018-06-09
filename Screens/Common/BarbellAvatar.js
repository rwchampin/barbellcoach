import React, { Component } from 'react';
import {
  Image,
  View
} from 'react-native';

class BarbellAvatar extends Component {
  constructor(props) {
    super(props);
    this.getSize = this.getSize.bind(this);
  }
  getSize() {
    let size = '';
    switch (this.props.size) {
      case 'small':
        size = 30;
        break;
      case 'medium':
        size = 60;
        break;
      case 'large':
        size = 90;
        break;
      default:
        size = 60;
    }
    return size;
  }
  render() {
    const size = this.getSize();
    const style = {
      height: size,
      width: size,
      borderRadius: size / 2
    };
    if (this.props.active) {
      style.borderWidth = 1;
      style.borderColor = 'black';
    }

    let avatar = null;
    if (this.props.source) {
      avatar = (
        <Image
          source={{ uri: this.props.source }}
          style={style}
        />
      );
    } else {
      avatar = <View style={style} />;
    }

    return (
      <View>
        {avatar}
      </View>
    );
  }
}

export default BarbellAvatar;
