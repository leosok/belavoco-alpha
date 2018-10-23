// Import a library to help create a component
import React from 'react';
import { View } from 'react-native';

import Colors from '../../constants/Colors';

// Make a component
// const CardSectionAP = (props) => {
class CardSectionAP extends React.Component {
    
    setPlayerSize() {
        // console.log(this.props);
        // console.log('inCSAP: ' + this.props.children.props.fullscreen);
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

    render() {
        return (
            // <View style={styles.containerStyle}>
            <View style={this.setPlayerSize()}>
                {this.props.children}
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        // borderWidth: 1,
        // borderColor: 'black',
        padding: 5,
        height: 80, 
        backgroundColor: '#92e8a9',
        // justifyContent: 'flex-start',
        // flexDirection: 'row',
        // position: 'relative',
        alignSelf: 'stretch',
        // flex: 1,
    },
};


// Make the compoent available to other parts of the app
export { CardSectionAP };
