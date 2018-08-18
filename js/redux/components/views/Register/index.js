import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';

import ScreenBase from '../ScreenBase';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import UIButton from '../../partials/UIButton';

const { width, height } = Dimensions.get('window');
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

const registerForm = t.struct({
  email,
  password,
  name,
});

const options = {
  fields: {
    email: {
      error: 'Insert a valid email',
    },
    password: {
      password: true,
      secureTextEntry: true,
      error: 'Password must contain at least 6 letters or numbers',
    },
    name: {
      error: 'Name should be valid and contain only letters',
    },
  },
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };
  }

  static navigationOptions = {
    title: 'Register',
  };

  static PropTypes = {
    screenProps: PropTypes.object,
  };

  _onPress() {
    let value = this.refs.form.getValue();
    if (value) {
      this.props.screenProps.createUser(
        value.email,
        value.password,
        value.name,
      );
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { disabled } = this.state;

    return (
      <ScreenBase>
        <Form ref="form" type={registerForm} options={options} />
        <UIButton
          disabled={disabled}
          title="Register ✨"
          style={styles.button}
          onPress={this._onPress.bind(this)}
        />
        <View style={styles.bottomOptions}>
          <Text onPress={() => navigate('Login')}>
            Already a 🦄 user ? Log In
          </Text>
        </View>
      </ScreenBase>
    );
  }
}

const styles = {
  button: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  bottomOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
};
