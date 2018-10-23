// Import a library to help create a compone
import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Platform
    } from 'react-native';
import { Icon } from 'react-native-elements';

import { Spinner } from '.';

// Make a component
class PlayButton extends Component {

    onPress = () => {
        this.props.PlayButtonPress();
    }

    renderPlayMode(iconStyle, playingState) {
        if (String(playingState) === 'PLAYING') {
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
        } else if (String(playingState) === 'PAUSED') {
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
        } else if (String(playingState) === 'BUFFERING' || String(playingState) === 'STOPPED') {
            return (
                <Spinner />
            );
        } else if (String(playingState) === 'ERROR') {
            return (
                <Icon
                    name={
                        Platform.OS === 'ios'
                            ? 'ios-close'
                            : 'md-close'
                        }
                    size={45}
                    style={iconStyle}
                    type='ionicon'
                    color='grey'
                />
            );
        } else if (String(playingState) === 'FINISHED') {
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
