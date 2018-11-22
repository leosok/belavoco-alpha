// Import a library to help create a component
import React from 'react';
// import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../constants/Colors';

// Make a component
// const CardSectionAP = (props) => {
class CardSectionAP extends React.Component {
    
    setPlayerSize() {
        if (this.props.children.props.fullscreen === true) {
        return {
            padding: 5,
            height: '100%',
            backgroundColor: Colors.audioPlayer,
            alignSelf: 'stretch'
            };
        }
        return {
            padding: 5,
            height: 80,
            backgroundColor: Colors.audioPlayer,
            alignSelf: 'stretch'
        };
    }

    setColors() {
        if (this.props.children.props.fullscreen === true) {
            return [Colors.audioPlayer, 'white'];
        }
        return [Colors.audioPlayer, Colors.audioPlayer];
    }

    render() {
        return (
            <LinearGradient colors={this.setColors()} style={this.setPlayerSize()}>
                {this.props.children}
            </LinearGradient>
        );
    }
}

// Make the compoent available to other parts of the app
export { CardSectionAP };
