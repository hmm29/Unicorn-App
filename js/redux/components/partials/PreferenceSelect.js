/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {View} from 'react-native';

import UIButton from './UIButton';
import UIButtonsWrapper from './UIButtonsWrapper';
import UITitle from './UITitle';
import PropTypes from 'prop-types';

export default class PreferenceSelect extends Component {
  static propTypes = {
    active: PropTypes.string,
    prompt: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    setPreference: PropTypes.func.isRequired
  }
  
  render() {
    const {active, item, prompt, options, setPreference} = this.props;
    
    return (
      <View style={styles.container}>
        <UITitle>
          {prompt}
        </UITitle>
        <UIButtonsWrapper>
          {options && options.map((option, i) =>
            <UIButton key={i} style={option === active ? {backgroundColor: 'lightblue'} : {}}
                      onPress={() => setPreference.call(this, {[item]: option})}
                      title={option} />)}
        </UIButtonsWrapper>
      </View>)
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
}