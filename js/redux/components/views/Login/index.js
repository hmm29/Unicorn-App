/**
 * Created by harrisonmiller on 9/29/17.
 */
import React, {Component} from 'react';
import {
  AsyncStorage,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AlertIOS} from 'react-native';

import ScreenBase from '../ScreenBase';
import UIButton from '../../partials/UIButton';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');
const Form = t.form.Form;

const email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    return reg.test(email);
});

const password = t.refinement(t.String, password => {
    const reg = /[0-9a-zA-Z]{6,}/; //or any other regexp
    return reg.test(password);
});

const name = t.refinement(t.String, name => {
    const reg = /^[a-zA-Z]+$/; //or any other regexp
    return reg.test(name);
});

const loginForm = t.struct({
  email,
  password
});

const options = {
  fields: {
    email: {
      error: 'Insert a valid email'
    },
    password: {
      password: true,
      secureTextEntry: true,
      error: 'Please use a valid password'
    },
  }
};

export default class Login extends Component {
  static navigationOptions = {
    title: 'Log In'
  };

  static PropTypes = {
    screenProps: PropTypes.object
  };
  
  _onPress() {
    let value = this.refs.form.getValue();
    if (value) {
      this.props.screenProps.login(value.email, value.password);
    }
  }
  
  render() {
    return (
      <ScreenBase>
        <Form
          ref="form"
          type={loginForm}
          options={options}/>
        <UIButton title="Log In" style={styles.button} onPress={this._onPress.bind(this)}/>
      </ScreenBase>
    )
  }
}

const styles = {
  buttonText: {
    fontSize: height/40,
    textAlign: 'center'
  },
  button: {
    width: width-20,
    height: height/8,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
};