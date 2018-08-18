import React, { Component } from 'react';
import { Alert, NativeModules, Platform, StatusBar, View } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { login, logout } from '../../actions/auth';
import { token } from '../../../data/token.json';
import Auth0 from 'react-native-auth0';

import Login from '../../components/views/Login/index';
import Register from '../../components/views/Register/index';
import AudioPlayerScreen from '../AudioPlayerScreen/index';

const MyNativeAlertManager = NativeModules.MyNativeAlertManager;

const auth0 = new Auth0({
  domain: 'hmax.auth0.com',
  clientId: '7cjbXwTO7Lx-ixyt10t4GczxF19eAONO',
});
const CLIENT_ID_PARAM = { clientId: '7cjbXwTO7Lx-ixyt10t4GczxF19eAONO' };

const DrawerNavigation = DrawerNavigator({
  AudioPlayer: { screen: AudioPlayerScreen },
});

const StackNavigation = StackNavigator({
    Home: { screen: Register },
    Login: { screen: Login },
});

class Application extends Component {
  async _createUser(email, password, name) {
    try {
      let userInfo = await auth0.auth.createUser({
        email,
        password,
        connection: 'Username-Password-Authentication',
        metadata: {
          name,
        },
      });
      this._handleUserDataResponse(
        userInfo,
        'Registration Success',
        `Welcome, ${this._getUserName(userInfo)}!`,
      );
    } catch (e) {
      Alert.alert(
        'Oops!',
        'There was a problem with creating your new user account!\n\n' +
          e.message,
      );
    }
  }

  async _getUserInfo(accessToken) {
    try {
      let userInfo = await auth0.auth.userInfo({ token: accessToken });
      this._handleUserDataResponse(
        userInfo,
        'Login Success',
        `You're successfully logged in, ${this._getUserName(userInfo)}`,
      );
    } catch (e) {
      Alert.alert(
        'Oops!',
        'There was a problem with fetching user info!\n\n' + e.message,
      );
    }
  }

  _handleUserDataResponse(userInfo, alertMessageTitle, alertMessageBody) {
    Alert.alert(alertMessageTitle, alertMessageBody);

    const currentUserId = userInfo.sub || 'auth0|' + userInfo.Id;
    this.props.onLogin(currentUserId, this._getUserName(userInfo));
  }

  // Auth 0 made fetching user_metadata a lot trickier with their recent OIDC Conformance implementation
  // user name will either be in userMetadata field or a custom namespace field show below
  _getUserName(userInfo) {
    return (
      (userInfo.metadata && userInfo.metadata.name) ||
      (userInfo['https://unicornapp.boomsight.com/user_metadata'] &&
        userInfo['https://unicornapp.boomsight.com/user_metadata'].name)
    );
  }

  async _login(email, password) {
    try {
      let data = await auth0.auth.passwordRealm({
        username: email,
        password,
        realm: 'Username-Password-Authentication',
      });
      this._getUserInfo(data.accessToken);

    } catch (e) {
      Alert.alert('Oops!', 'There was a problem with login!\n\n' + e.message);
    }
  }

  async _logout(params) {
    try {
      const logoutUrl = auth0.auth.logoutUrl(params);

      let response = await fetch(logoutUrl);
      this.props.onLogout();

      if (response) {
        if(Platform.OS === 'ios') {
            MyNativeAlertManager.alert('Logout Success', `You've logged out.`); // use native iOS bridge here
        } else {
            Alert.alert('Logout Success', `You've logged out.`);
        }
      }
    } catch (e) {
      Alert.alert('Oops!', 'There was a problem with logout!\n\n' + e.message);
    }
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#aaa" />
        {this.props.currentUserId ? (
          <DrawerNavigation
            screenProps={{
              currentUserName: this.props.currentUserName,
              logout: () => this._logout.call(this, CLIENT_ID_PARAM),
            }}
          />
        ) : (
          <StackNavigation
            screenProps={{
              createUser: this._createUser.bind(this),
              login: this._login.bind(this),
            }}
          />
        )}
      </View>
    );
  }
}

const styles = {
  appContainer: {
    flex: 1,
  },
};

const mapStateToProps = state => {
  return {
    currentUserId: state.auth.currentUserId,
    currentUserName: state.auth.currentUserName,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (currentUserId, currentUserName) =>
      dispatch(login(currentUserId, currentUserName)),
    onLogout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Application);
