import React, {Component} from 'react';
import {AsyncStorage, Dimensions, TouchableOpacity, Text} from 'react-native';
import ScreenBase from '../ScreenBase';
import UIButtonsWrapper from '../../partials/UIButtonsWrapper';
import UIButton from '../../partials/UIButton';
const {width, height} = Dimensions.get('window');

export default class Auth extends Component {
  static navigationOptions = {
    title: 'Unicorn App'
  };
  
  render() {
    const {navigate} = this.props.navigation;
    
    return (
      <ScreenBase>
        <UIButtonsWrapper style={styles.buttonsWrapper}>
          <UIButton style={styles.button} title="Log In" onPress={() => navigate('Login')}/>
          <UIButton style={styles.button} title="Register" onPress={() => navigate('Register')}/>
        </UIButtonsWrapper>
      </ScreenBase>
    )
  }
}

const styles = {
  buttonsWrapper: {
    flexDirection: 'column'
  },
  button: {
    width: width-20,
    height: height/8,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    marginVertical: height/40,
    marginHorizontal: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
}