/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');

export default class UIButtonsWrapper extends Component {
  static propTypes = {
    style: PropTypes.object
  }
  render() {
    const {style} = this.props;
    
    return (
      <View style={[styles.buttonsWrapper, style]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = {
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: height/20
  }
}