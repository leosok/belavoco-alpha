// Import a library to help create a compone
import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Platform
    } from 'react-native';
import { Icon } from 'react-native-elements';

import TrackPlayer from 'react-native-track-player';

import { Spinner } from '.';


// Make a component
class PlayButton extends Component {
    constructor(props) {
        super(props);
        this.playbackState = null;
      }

    onPress = () => {
        this.props.PlayButtonPress();
    }

    
    renderPlayMode(iconStyle, playingState) {
        TrackPlayer.getState().then(async (state) => {
            this.playbackState = state;
            });
        if (this.playbackState === TrackPlayer.STATE_PLAYING) {
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
        } else if (this.playbackState === TrackPlayer.STATE_PAUSED) {
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
        } else if (this.playbackState === TrackPlayer.STATE_BUFFERING || this.playbackState === null) {
            return (
                <Spinner />
            );
        // } else if (String(playingState) === 'ERROR') {
        //     return (
        //         <Icon
        //             name={
        //                 Platform.OS === 'ios'
        //                     ? 'ios-close'
        //                     : 'md-close'
        //                 }
        //             size={45}
        //             style={iconStyle}
        //             type='ionicon'
        //             color='grey'
        //         />
        //     );
        } else if (this.playbackState === TrackPlayer.STATE_STOPPED) {
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


        // if (this.state.isLoading) {
        //   return <Spinner size="small" />;
        // }
        // return (
        //     <TouchableOpacity
        //       onPress={this.onPress}
        //       style={buttonStyle}
        //     >
        //       {this.renderPlayMode(iconStyle, playingState)}
        //     </TouchableOpacity>
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
