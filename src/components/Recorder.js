// Import a library to help create a component
import React from 'react';

import { View,
         Text, 
         TouchableHighlight,
         Platform,
         StyleSheet,
         KeyboardAvoidingView
        } from 'react-native';

import { Icon } from 'react-native-elements';

import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';

import { IconButton, TextInputTranmit, Button, InstructionText } from './common';

import apiUtils from '../api/apiUtils';

// import {
//     IconButton,
//      } from './common';

// import settings from '../../settings';
// import utils from '../utils/utils';
// import apiUtils from '../api/apiUtils';
// import playerUtils from '../player/playerUtils';

// import Colors from '../constants/Colors';

// Make a component

const instructionTitle = 'Letzter Schritt';
const instructionText = 'Jetzt musst du nur noch die wichtigsten Informationen zu deinem Text angeben.';
const parametersIncomplete = 'Deine Angaben sind unvollständig.';

export default class Recorder extends React.Component {
    constructor(props) {
      super(props);
      this.setAuthor = this.setAuthor.bind(this);
      this.setTitle = this.setTitle.bind(this);
      this.setReader = this.setReader.bind(this);
    }

    state = {
        currentTime: 0.0,
        recording: false,
        paused: false,
        stoppedRecording: false,
        finished: false,
        audioPath: AudioUtils.DocumentDirectoryPath + '/recording.aac',
        hasPermission: true,
        prepareForTransmission: false,
        author: '',
        title: '',
        reader: '',
      };
  
      prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
          SampleRate: 22050,
          Channels: 1,
          AudioQuality: 'Low',
          AudioEncoding: 'aac',
          AudioEncodingBitRate: 32000
        });
      }
  
      componentDidMount() {
        this.prepareRecordingPath(this.state.audioPath);
        AudioRecorder.onProgress = (data) => {
            this.setState({ currentTime: Math.floor(data.currentTime) });
        };
        AudioRecorder.onFinished = (data) => {
              // Android callback comes in the form of a promise instead.
          if (Platform.OS === 'ios') {
            this._finishRecording(data.status === 'OK', data.audioFileURL, data.audioFileSize);
          }
        };

        AudioRecorder.requestAuthorization().then((isAuthorised) => {
          this.setState({ hasPermission: isAuthorised });
  
          if (!isAuthorised) return;
  
          this.prepareRecordingPath(this.state.audioPath);
  
          AudioRecorder.onProgress = (data) => {
            this.setState({ currentTime: Math.floor(data.currentTime) });
          };
  
          AudioRecorder.onFinished = (data) => {
            // Android callback comes in the form of a promise instead.
            if (Platform.OS === 'ios') {
              this._finishRecording(data.status === 'OK', data.audioFileURL, data.audioFileSize);
            }
          };
        });
      }
  
      // _renderButton(title, onPress, active) {
      //   const style = (active) ? styles.activeButtonText : styles.buttonText;
  
      //   return (
      //     <TouchableHighlight style={styles.button} onPress={onPress}>
      //       <Text style={style}>
      //         {title}
      //       </Text>
      //     </TouchableHighlight>
      //   );
      // }

      // _renderPauseButton(onPress, active) {
      //   const style = (active) ? styles.activeButtonText : styles.buttonText;
      //   const title = this.state.paused ? 'RESUME' : 'PAUSE';
      //   return (
      //     <TouchableHighlight style={styles.button} onPress={onPress}>
      //       <Text style={style}>
      //         {title}
      //       </Text>
      //     </TouchableHighlight>
      //   );
      // }
  
      async _pause() {
        if (!this.state.recording) {
          console.warn('Can\'t pause, not recording!');
          return;
        }
  
        try {
          const filePath = await AudioRecorder.pauseRecording();
          this.setState({ paused: true });
        } catch (error) {
          console.error(error);
        }
      }
  
      async _resume() {
        if (!this.state.paused) {
          console.warn('Can\'t resume, not paused!');
          return;
        }
        try {
          await AudioRecorder.resumeRecording();
          this.setState({ paused: false });
        } catch (error) {
          console.error(error);
        }
      }
  
      async _stop() {
        if (!this.state.recording) {
          console.warn('Can\'t stop, not recording!');
          return;
        }
  
        this.setState({ 
          stoppedRecording: true, 
          recording: false, 
          paused: false });
  
        try {
          const filePath = await AudioRecorder.stopRecording();
  
          if (Platform.OS === 'android') {
            this._finishRecording(true, filePath);
          }
          return filePath;
        } catch (error) {
          console.error(error);
        }
      }
  
      async _play() {
        if (this.state.recording) {
          // await this._stop();
          await this._pause();
        }
  
        // These timeouts are a hacky workaround for some issues with react-native-sound.
        // See https://github.com/zmxv/react-native-sound/issues/89.
        setTimeout(() => {
          var sound = new Sound(this.state.audioPath, '', (error) => {
            if (error) {
              console.log('failed to load the sound', error);
            }
          });
  
          setTimeout(() => {
            sound.play((success) => {
              if (success) {
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
          }, 100);
        }, 100);
      }
  
      async _record() {
        if (this.state.recording) {
          console.warn('Already recording!');
          return;
        }
  
        if (!this.state.hasPermission) {
          console.warn('Can\'t record, no permission granted!');
          return;
        }
  
        if (this.state.stoppedRecording) {
          this.prepareRecordingPath(this.state.audioPath);
        }
  
        this.setState({ recording: true, paused: false });
  
        try {
          this.props.goToFullScreen();
          const filePath = await AudioRecorder.startRecording();
        } catch (error) {
          console.error(error);
        }
      }
  
      _finishRecording(didSucceed, filePath, fileSize) {
        this.setState({ finished: didSucceed });
        console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
      }
  
      async prepareRecording() {
        if (this.state.recording) {
          await this._stop();
        }
        this.setState({ prepareForTransmission: true });
        // this.props.recordingDone();
      }

      async transmitRecording() {
        const {
          author,
          title,
          reader,
        } = this.state;
             
        if ((author || title || reader) === '') {
          alert(parametersIncomplete);
        } else {
          apiUtils.transmitRecording(author, title, reader);
          this.props.recordingDone();
          this.setState({ prepareForTransmission: false });
        }
      }

      setAuthor(someArg) {
        this.setState({ author: someArg });
      }
      setTitle(someArg) {
        this.setState({ title: someArg });
      }
      setReader(someArg) {
        this.setState({ reader: someArg });
      }

      renderPlayButton() {
        return (
          <TouchableHighlight style={styles.recordButton} onPress={() => this._play()}>
            <Icon 
              name='play-arrow'
              size={45}
              type='materialicons'
              color='red'
            />
          </TouchableHighlight>
        );
      }

      renderRecordButton() {
        if (!this.state.recording) {
          return (
            <TouchableHighlight style={styles.recordButton} onPress={() => this._record()}>
              <Icon 
                name='fiber-manual-record'
                size={45}
                type='materialicons'
                color='red'
              />
            </TouchableHighlight>
          );
        } else if (this.state.recording && !this.state.paused) {
          return (
            <TouchableHighlight style={styles.recordButton} onPress={() => this._pause()}>
              <Icon 
                name='pause'
                size={45}
                type='materialicons'
                color='grey'
              />
            </TouchableHighlight>
          );
        } else if (this.state.recording && this.state.paused) {
          return (
            <TouchableHighlight style={styles.recordButton} onPress={() => this._resume()}>
              <Icon 
                name='repeat'
                size={45}
                type='materialicons'
                color='grey'
              />
            </TouchableHighlight>
          );
        }
      }

      renderRecordingScreen() {
        // renders recorder JSX, based on screenMode, transmitted from RecorderScreen.js
        if (this.props.screenMode === 1) {  // recording is active
          if (!this.state.prepareForTransmission) {
            return (
              <View style={styles.container}>
                {this.renderPlayButton()}
                {this.renderRecordButton()}
                <IconButton 
                    onPress={this.prepareRecording.bind(this)}
                    name='arrow-round-up'
                    size={45}
                    type='ionicon'
                    color='red'
                />
            </View>
            );
          } return (
            <View style={styles.containerParamMode}>
              <View style={styles.instructions}>
                <InstructionText 
                  title={instructionTitle}
                  text={instructionText}
                />
                {/* <Text>Hallo</Text> */}
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.parameterInput}>
                  <TextInputTranmit 
                    returnText={this.setAuthor.bind(this)}
                    inputActiv={true}
                    title='Autor:'
                    text=''
                    placeholder='Name des Autors'
                  />
                  <TextInputTranmit 
                    returnText={this.setTitle.bind(this)}
                    inputActiv={true}
                    title='Titel:'
                    text=''
                    placeholder='Titel des Textes'
                  />
                  <TextInputTranmit 
                    returnText={this.setReader.bind(this)}
                    inputActiv={true}
                    title='Gelesen von:'
                    text=''
                    placeholder='Name des Vorlesenden'
                  />
                  <View style={{ height: 40 }}>
                    <Button
                      buttonText={'Veröffentlichen'}
                      onPress={() => this.transmitRecording()}
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        } return (
          <View style={styles.container}>
            {this.renderRecordButton()}
          </View>
        );
      }

      render() {
        console.log('Screenmode: ' + this.props.screenMode);
        return (
          <View style={styles.container}>
            {this.renderRecordingScreen()}
          </View>
        );
      }
    }
  
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
      },
      containerParamMode: {
        flex: 1,
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
      },
      controls: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        // paddingLeft: 10,
        // paddingRight: 10,
      },
      controls2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
      },
      instructions: {
        alignItems: 'center', 
        paddingTop: 20,
        paddingBottom: 20,
        // backgroundColor: 'red', 
      },
      parameterInput: {
        flex: 1,
      },
      progressText: {
        paddingTop: 20,
        fontSize: 30,
        color: '#fff'
      },
      button: {
        padding: 15
      },
      recordButton: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: 'black',
        backgroundColor: 'white',
        // padding: 20,
        // marginLeft: 5,
        // marginRight: 5
      },
      disabledButtonText: {
        color: '#eee'
      },
      buttonText: {
        fontSize: 20,
        color: '#fff'
      },
      activeButtonText: {
        fontSize: 20,
        color: '#B81F00'
      }
  
    });
