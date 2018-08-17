/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

const {height} = Dimensions.get('window');

export default class UIButton extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    style: PropTypes.object
  }
  
  render() {
    const {disabled, onPress, title, style} = this.props;
    
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]} disabled={disabled}>
          <Text style={styles.buttonText}>
            {title}
          </Text>
      </TouchableOpacity>
    )
  }
}

const styles = {
  button: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    width: height/10,
    height: height/10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: height/45,
    textAlign: 'center'
  }
}