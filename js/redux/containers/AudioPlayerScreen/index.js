import React, { Component } from 'react';
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioPlayer from 'react-native-play-audio';
import ScreenBase from '../../components/views/ScreenBase';
import UIButton from '../../components/partials/UIButton';
import { connect } from 'react-redux';
import UIButtonsWrapper from '../../components/partials/UIButtonsWrapper';

const { width, height } = Dimensions.get('window');

class AudioPlayerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: '',
      isPlaying: false,
    };
  }

  componentDidMount() {
    const url =
        'https://uc8520665825fad19594c13669b5.previews.dropboxusercontent.com/p/orig/AAL131hhfHykvw6vHSen_D9dv0l7aDBzNJcGyp7db095r1AlWOLTu_k5s3igKJzLfoFCK1bDfhOqtCZ5BgMjXzWmnWxFDUGYXLr_l9e-oogvzjuCzHjwwcJCzjHDYTeUA-HuYvHtjgITdMvPu5j66O-H/p.mp3?dl=0&duc_id=dropbox_duc_id',
      self = this;

    AudioPlayer.prepare(url, () => {
      self._play();

      AudioPlayer.getDuration(duration => {
        console.log(duration);
      });
      setInterval(() => {
        AudioPlayer.getCurrentTime(currentTime => {
          self.setState({ currentTime });
        });
      }, 1000);
    });

    // Loop on iOS, stop on Android
    AudioPlayer.onEnd(Platform.OS === 'ios' ? this._play : this._stop);
  }

  _pause() {
    AudioPlayer.pause();
    this.setState({ isPlaying: false });
  }

  _play() {
    AudioPlayer.play();
    this.setState({ isPlaying: true });
  }

  _stop() {
    AudioPlayer.stop();
    this.setState({ isPlaying: false });
  }

  render() {
    const { navigation, screenProps } = this.props,
      { currentUserName, logout } = screenProps,
      { navigate } = navigation,
      { isPlaying } = this.state;

    return (
      <ScreenBase navigate={navigate}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Welcome {currentUserName} to 🦄 paradise!
          </Text>
          <UIButtonsWrapper>
            {!isPlaying ? (
              <TouchableOpacity
                onPress={() => this._play()}
                style={styles.audioControlButton}
              >
              <Text style={styles.audioControlButtonText}>▶️</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => this._pause()}
                style={styles.audioControlButton}
              >
                <Text style={styles.audioControlButtonText}>⏸️</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => this._stop()}
              style={styles.audioControlButton}
            >
            <Text style={styles.audioControlButtonText}>⏹</Text>
            </TouchableOpacity>
          </UIButtonsWrapper>
          <UIButton
            onPress={() => {
              this._stop();
              logout();
            }}
            title="Log out"
            style={[styles.button, styles.logout]}
          />
        </View>
      </ScreenBase>
    );
  }
}

const styles = {
  audioControlButton: {
    marginHorizontal: 20
  },
  audioControlButtonText: {
    fontSize: height / 10
  },
  button: {
    width: width / 2.5,
    marginVertical: height / 40,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logout: {
    alignSelf: 'center',
    marginVertical: height / 8,
  },
  text: {
    fontSize: 20,
  },
};

const mapStateToProps = state => {
  return {
    currentUserName: state.auth.currentUserName,
  };
};

export default connect(mapStateToProps)(AudioPlayerScreen);
