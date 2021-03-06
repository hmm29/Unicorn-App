import React, { Component } from 'react';
import {
  Animated,
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
      rightToLeftAnimationRightPositionValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const url =
        'https://res.cloudinary.com/dxdsyeoz9/video/upload/v1534751733/Pink_Fluffy_Unicorns_Dancing_on_Rainbows_-_Fluffle_Puff_1_online-audio-converter.com_klvbog.mp3',
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

  _animate() {
      Animated.timing(this.state.rightToLeftAnimationRightPositionValue, {
          toValue: width,
          duration: 10000,
      }).start();
  }

    _play() {
    AudioPlayer.play();
    this.setState({ isPlaying: true });
    this._animate();
  }

    _pause() {
        AudioPlayer.pause();
        this.setState({ isPlaying: false });
        Animated.timing(this.state.rightToLeftAnimationRightPositionValue).stop((value) => {
            this.setState({
                rightToLeftAnimationRightPositionValue: value
            })
        });
    }

  _stop(resetAnimation) {
    AudioPlayer.pause();
    AudioPlayer.setTime(0);
    if(resetAnimation) {
        Animated.timing(this.state.rightToLeftAnimationRightPositionValue).stop();
        this.setState({
            isPlaying: false,
            rightToLeftAnimationRightPositionValue: new Animated.Value(0)
        })
    }
  }

  render() {
    const { navigation, screenProps } = this.props,
      { currentUserName, logout } = screenProps,
      { navigate } = navigation,
      { isPlaying, rightToLeftAnimationRightPositionValue } = this.state;

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
              onPress={() => this._stop(true)}
              style={styles.audioControlButton}
            >
              <Text style={styles.audioControlButtonText}>⏹</Text>
            </TouchableOpacity>
          </UIButtonsWrapper>
          <View style={styles.animationContainer}>
            <Animated.Text
              style={{
                ...styles.animatedText,
                right: rightToLeftAnimationRightPositionValue, // Bind opacity to animated value
              }}
            >
              🦄🦄🦄
            </Animated.Text>
          </View>
          <UIButton
            onPress={() => {
              this._stop(false);
              AudioPlayer.stop();
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
  animationContainer: {
    width,
    justifyContent: 'flex-end',
  },
  animatedText: {
    fontSize: height / 10,
    position: 'absolute',
    top: 40,
    right: 0,
  },
  audioControlButton: {
    marginHorizontal: 20,
  },
  audioControlButtonText: {
    fontSize: height / 10,
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
    marginVertical: height / 4,
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
