// Import a library to help create a component
import React from 'react';

import { View,
         Text, 
         TouchableOpacity 
        } from 'react-native';

import moment from 'moment';
import 'moment/locale/de';
import axios from 'axios';
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

import settings from '../../settings';
import utils from '../utils/utils';
import apiUtils from '../api/apiUtils';
import playerUtils from '../player/playerUtils';

import PlayerStore from '../stores/Player';
import TrackStore from '../stores/Track';

import { Spinner } from './common/Spinner';

// Make a component

let interval;
const API_ENDPOINT_COMMENTS = settings.getBackendHost().concat('/api/comment/');

class ProgressBar extends ProgressComponent {
    render() {
      return (
        <View style={styles.progress}>
          <View style={{ flex: this.getProgress(), backgroundColor: 'grey' }} />
          <View style={{ flex: 1 - this.getProgress() }} />
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
        comments: [],
        loadingComments: true,
        loadingLatestComment: false,
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

    async refreshCommentData() {
        const userhash = await utils.getUserParameter('hash');
        const endpoint = API_ENDPOINT_COMMENTS.concat(this.props.audiobook.hash);
        axios.get(endpoint, { 
          headers: apiUtils.getRequestHeader(userhash)
        })
        .then(response => this.setState({
            comments: response.data,
            loadingComments: false,
            loadingLatestComment: false,
           }))
        .catch(e => console.log(e));
      }

    remoteRefresh(mode) {
        console.log('MODE: ' + mode);
        if (mode === 'addComment') {
            this.setState({
                loadingLatestComment: true,
            });
        }
        this.refreshCommentData();
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
        if (this.state.fullscreen === false) {
            this.refreshCommentData();
        } else if (this.state.fullscreen === true) {
            this.setState({
                loadingComments: true,
            });
        }
        this.props.minimizePlayerHandler();
    }

    renderPlayerContent() {
        const PlayButtonPress = this.PlayButtonPress;
        const {
            containerStyle,
            infoContainerStyle,
            progressContainerStyle,
            playButtonContainer,
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
                                <IconButton 
                                    onPress={playerUtils.rewindThirty.bind(this)}
                                    name='undo'
                                    size={25}
                                    type='ionicon'
                                    color='grey'
                                />
                                <View style={playButtonContainer}>
                                    <PlayButton
                                        playingState={this.state.playingState}
                                        PlayButtonPress={PlayButtonPress}
                                    />
                                </View>
                                <IconButton 
                                    onPress={playerUtils.forwardThirty.bind(this)}
                                    name='redo'
                                    size={25}
                                    type='ionicon'
                                    color='grey'
                                />
                            </View>
                            <TouchableOpacity
                                onPress={this.minimizePlayer.bind(this)}
                                style={infoContainer}
                            >
                            {/* <View style={infoContainer}> */}
                                <Text style={authorStyle}>{TrackStore.artist}</Text>
                                <Text style={titleStyle}>{TrackStore.title}</Text>
                            </TouchableOpacity>
                            {/* </View> */}
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
                    <CommentSection
                        trackhash={this.props.audiobook.hash} 
                        remoteRefresh={this.remoteRefresh.bind(this)}
                    >
                        {this.renderComments()}
                    </CommentSection>
                </View>
            );
        } else if (this.state.fullscreen === false) {
            return (
                <View style={containerStyle}>
                    <View style={infoContainerStyle}>
                        <View style={buttonContainer}>
                            <IconButton 
                                onPress={playerUtils.rewindThirty.bind(this)}
                                name='undo'
                                size={25}
                                type='ionicon'
                                color='grey'
                            />
                            <View style={playButtonContainer}>
                                <PlayButton
                                    playingState={this.state.playingState}
                                    PlayButtonPress={PlayButtonPress}
                                />
                            </View>
                            <IconButton 
                                onPress={playerUtils.forwardThirty.bind(this)}
                                name='redo'
                                size={25}
                                type='ionicon'
                                color='grey'
                            />
                        </View>
                        <TouchableOpacity
                            onPress={this.minimizePlayer.bind(this)}
                            style={infoContainer}
                        >
                        {/* <View style={infoContainer}> */}
                            <Text style={authorStyle}>{TrackStore.artist}</Text>
                            <Text style={titleStyle}>{TrackStore.title}</Text>
                        </TouchableOpacity>
                        {/* </View> */}
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

    renderCommentsOnly() {
        return (

            this.state.comments.map(comment => 
                <Comment 
                    key={comment.id} 
                    id={comment.id} 
                    text={comment.content} 
                    user={comment.user} 
                    // time={moment(comment.pub_date).locale('de').calendar()} 
                    time={moment(comment.pub_date).locale('de').format("DD.MM.YY")}
                    remoteRefresh={this.remoteRefresh.bind(this)}
                />)
        );
    }

    renderComments() {
        if (this.state.loadingComments === true) {
            return <Spinner />;
        } else if (this.state.loadingLatestComment === true) {
            return (
                <View>
                    <Spinner />
                    {this.renderCommentsOnly()}
                </View>
            );
        } 
        return (this.renderCommentsOnly());
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
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    progress: {
        flexDirection: 'row',
        height: 8,
        width: '80%',
        borderWidth: 0.5,
        borderRadius: 4,
        borderColor: 'grey',
    },
    playButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        // padding: 5,
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 7,
        flex: 2,
    },
    infoContainer: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        marginLeft: 12,
        flex: 5,
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
