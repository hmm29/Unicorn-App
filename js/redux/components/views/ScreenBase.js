/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class ScreenBase extends Component {
  static props = {
    navigate: PropTypes.func
  }
  
  render() {
    const {navigate} = this.props;

    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#ddd',
    paddingTop: 20
  },
  icon: {
    width: width/20,
    height: height/25,
    padding: height/40
  },
  navButton: {
    position: 'absolute',
    top: width/12,
    left: width/20,
    zIndex: 999
  }
}