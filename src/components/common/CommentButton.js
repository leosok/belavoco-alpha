// Import a library to help create a component
import React from 'react';
import { View, Text } from 'react-native';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';

const fFamily = 'Helvetica';
const fPosition = 'absolute';
const fSize = 16;
const fBottom = 29;

// Make a component
class CommentButton extends React.Component {

    getStyleJSON(rightMargin) {
        return {
            fontSize: fSize,
            fontFamily: fFamily,
            position: fPosition,
            right: rightMargin,
            bottom: fBottom,
        };
    }

    textStyleDynamic() {
        const numDigits = this.props.numberOfComments.toString().length;
        if (numDigits === 1) {
            return this.getStyleJSON(26);
        } else if (numDigits === 2) {
            return this.getStyleJSON(22);
        } else if (numDigits === 3) {
            return this.getStyleJSON(18);
        } return this.getStyleJSON(18);
    }

    render() {
        const {
            container,
        } = styles;
    
        let numberOfComments = this.props.numberOfComments;

        if (numberOfComments === 0) {
            numberOfComments = '';
        } else if (numberOfComments >= 1000) {
            numberOfComments = '>1k';
        }
    
        return (
            <View style={container}>
                <Icon 
                    onPress={this.props.onPress}
                    name='comment'
                    size={60}
                    color='grey'
                />
                <Text style={this.textStyleDynamic()}>{numberOfComments}</Text>
            </View>
        );
    }
}

const styles = {
    container: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
};

// Make the compoent available to other parts of the app
export { CommentButton };
