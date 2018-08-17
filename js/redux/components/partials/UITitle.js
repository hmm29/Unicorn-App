/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions, Text} from 'react-native';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');

export default class UITitle extends Component {
  static propTypes = {
    style: PropTypes.object
  }
  
  render() {
    const {style} = this.props;
    
    return (
      <Text style={[styles.text, style]}>
        {this.props.children}
      </Text>
    )
  }
}

const styles = {
  text: {
    fontSize: height/25,
    textAlign: 'center',
    marginHorizontal: width/40
  }
}