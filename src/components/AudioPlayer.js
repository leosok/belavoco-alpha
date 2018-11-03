// Import a library to help create a component
import React from 'react';

import { View,
         Text, 
        //  DeviceEventEmitter 
        } from 'react-native';

import { observer } from 'mobx-react';

import TrackPlayer, { ProgressComponent } from 'react-native-track-player';

// import PlayButton from './common/PlayButton';

import {
    PlayButton,
    ProgressDisplay,
    IconButton, 
    CommentSection,
    Comment
    } from './common';

import playerUtils from '../player/playerUtils';

import PlayerStore from '../stores/Player';
import TrackStore from '../stores/Track';

// Make a component

let interval;

class ProgressBar extends ProgressComponent {
    render() {
      return (
        <View style={styles.progress}>
          <View style={{ flex: this.getProgress(), backgroundColor: 'red' }} />
          <View style={{ flex: 1 - this.getProgress(), backgroundColor: 'grey' }} />
        </View>
      );
    }
  }

@observer
export default class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.PlayButtonPress = this.PlayButtonPress.bind(this);
      }

      state = {
        playingState: 'PLAYING',
        fullscreen: this.props.fullscreen,
        position: 0,
    };

    componentDidMount() {
        TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
            // stopWithApp: true,
            capabilities: [
              TrackPlayer.CAPABILITY_PLAY,
              TrackPlayer.CAPABILITY_PAUSE,
            //   TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            //   TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            ]
        });
        playerUtils.resetAndPlay(this.props.audiobooks, this.props.audiobook);

        interval = setInterval(async () => {
            this.setState({
                position: await TrackPlayer.getPosition()
            });
        }, 500);
      }

    componentWillReceiveProps(nextProps) {
        if (this.props.audiobook !== nextProps.audiobook) {
            playerUtils.resetAndPlay(nextProps.audiobooks, nextProps.audiobook);
           }
        if (this.props !== nextProps) {
            this.setState({
                fullscreen: nextProps.fullscreen,
            });
        }
    }

    PlayButtonPress() {
        this.playOrPause();
    }

    async playOrPause() {
        if (PlayerStore.playbackState === TrackPlayer.STATE_PAUSED) {
            await TrackPlayer.play();
          } else {
            await TrackPlayer.pause();
          }
    }

    minimizePlayer() {
        this.props.minimizePlayerHandler();
    }

    renderPlayerContent() {
        const PlayButtonPress = this.PlayButtonPress;
        const {
            containerStyle,
            infoContainerStyle,
            progressContainerStyle,
            buttonContainer,
            infoContainer,
            authorStyle,
            titleStyle,
        } = styles;

        if (this.state.fullscreen) {
            return (
                <View style={containerStyle}>
                    <View style={stylesLargeAP.movedPlayerStyle}>
                        <View style={infoContainerStyle}>
                            <View style={buttonContainer}>
                                <PlayButton
                                    playingState={this.state.playingState}
                                    PlayButtonPress={PlayButtonPress}
                                />
                            </View>
                            <View style={infoContainer}>
                                <Text style={authorStyle}>{TrackStore.artist}</Text>
                                <Text style={titleStyle}>{TrackStore.title}</Text>
                            </View>
                            <IconButton 
                                onPress={this.minimizePlayer.bind(this)}
                                name='arrow-round-down'
                                size={20}
                                type='ionicon'
                                color='grey'
                            />
                        </View>
                        <View style={progressContainerStyle}>
                            <ProgressBar />
                            <ProgressDisplay
                                position={this.state.position}
                                length={this.props.audiobook.length}
                            />
                        </View>
                    </View>
                    {this.renderComments()}
                </View>
            );
        } else if (this.state.fullscreen === false) {
            return (
                <View style={containerStyle}>
                    <View style={infoContainerStyle}>
                        <View style={buttonContainer}>
                            <PlayButton
                                playingState={this.state.playingState}
                                PlayButtonPress={PlayButtonPress}
                            />
                        </View>
                        <View style={infoContainer}>
                            <Text style={authorStyle}>{TrackStore.artist}</Text>
                            <Text style={titleStyle}>{TrackStore.title}</Text>
                        </View>
                        <IconButton 
                            onPress={this.minimizePlayer.bind(this)}
                            name='arrow-round-up'
                            size={20}
                            type='ionicon'
                            color='grey'
                        />
                    </View>
                    <View style={progressContainerStyle}>
                        <ProgressBar />
                        <ProgressDisplay
                            position={this.state.position}
                            length={this.props.audiobook.length}
                        />
                    </View>
                </View>
            );
        }
    }

    renderComments() {
        const text = 'Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text';
        const user1 = { username: 'Max', userhash: '123' };
        const user2 = { username: 'Leo', userhash: '456' };
        const date = '01.01.2019';
        return (
            <CommentSection>
                <Comment 
                    text={text}
                    user={user1}
                    date={date}
                />
                <Comment 
                    text={text}
                    user={user2}
                    date={date}
                />
                <Comment 
                    text={text}
                    user={user1}
                    date={date}
                />
                <Comment 
                    text={text}
                    user={user2}
                    date={date}
                />
                <Comment 
                    text={text}
                    user={user1}
                    date={date}
                />
                <Comment 
                    text={text}
                    user={user2}
                    date={date}
                />
                <Comment 
                    text={text}
                    user={user1}
                    date={date}
                />
                <Comment 
                    text={text}
                    user={user2}
                    date={date}
                />
            </CommentSection>
        );
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                {this.renderPlayerContent()}
            </View>
        );
    }
  }

const styles = {
    containerStyle: {
        flex: 1,
    },
    infoContainerStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
        flex: 3,
    },
    progressContainerStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    progress: {
        height: 3,
        width: '80%',
        // marginTop: 10,
        flexDirection: 'row',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        flex: 1,
    },
    infoContainer: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        marginLeft: 8,
        flex: 4
    },
    authorStyle: {
        fontSize: 15,
        // marginLeft: 8,
    },
    titleStyle: {
        fontSize: 17,
        // marginLeft: 8,
        // flex: 1,
    },
};
const stylesLargeAP = {
    movedPlayerStyle: {
        // paddingTop: 5,
        height: 80, 
    },
};
