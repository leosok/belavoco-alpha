// Import a library to help create a compone
import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Platform
    } from 'react-native';

import { observer } from 'mobx-react';
import TrackPlayer from 'react-native-track-player';

import { Icon } from 'react-native-elements';

import { Spinner } from '.';

import PlayerStore from '../../stores/Player';


// Make a component
@observer
class PlayButton extends Component {
    onPress = () => {
        this.props.PlayButtonPress();
    }

    renderPlayMode(iconStyle) {
        console.log('State in PB: ');
        console.log(PlayerStore.playbackState);
        console.log('Type in PB: ');
        console.log(PlayerStore.playbackType);

        if (PlayerStore.playbackState === TrackPlayer.STATE_PLAYING) {
          return (
            <Icon
                name={
                    Platform.OS === 'ios'
                        ? 'ios-pause'
                        : 'md-pause'
                    }
                size={45}
                style={iconStyle}
                type='ionicon'
                color='grey'
            />
          );
        } else if (PlayerStore.playbackState === TrackPlayer.STATE_PAUSED) {
            return (
                <Icon
                    name={
                        Platform.OS === 'ios'
                            ? 'ios-play'
                            : 'md-play'
                        }
                    size={45}
                    style={iconStyle}
                    type='ionicon'
                    color='grey'
                />
            );
        } else if (PlayerStore.playbackState === TrackPlayer.STATE_BUFFERING || 
                    PlayerStore.playbackState === TrackPlayer.STATE_NONE || 
                    // PlayerStore.playbackState === TrackPlayer.STATE_STOPPED || 
                    PlayerStore.playbackState === undefined) {
            return (
                <Spinner />
            );
        } else if (PlayerStore.playbackState === TrackPlayer.STATE_STOPPED) {
            return (
                <Icon
                    name={
                        Platform.OS === 'ios'
                            ? 'ios-square'
                            : 'md-square'
                        }
                    size={45}
                    style={iconStyle}
                    type='ionicon'
                    color='grey'
                />
            );
        }
    }

    render() {
        const { buttonStyle, iconStyle } = styles;
        const { playingState } = this.props;

        return (
            <TouchableOpacity
              onPress={this.onPress}
              style={buttonStyle}
            >
                {this.renderPlayMode(iconStyle, playingState)}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: 'center',
        marginRight: 8,
        marginLeft: 8,
    },
    iconStyle: {
        height: 50,
        width: 50,
    },
});

export { PlayButton };
