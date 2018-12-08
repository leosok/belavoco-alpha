// Import a library to help create a component
import React from 'react';
import { View, Text } from 'react-native';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';

const fFamily = 'Avenir-Medium';
const fPosition = 'absolute';
const fColor = 'grey';
const fSize = 14;
const fBottom = 14;

// Make a component
class CommentButton extends React.Component {

    getStyleJSON(rightMargin) {
        return {
            fontSize: fSize,
            fontFamily: fFamily,
            color: fColor,
            position: fPosition,
            right: rightMargin,
            bottom: fBottom,
        };
    }

    textStyleDynamic() {
        const numDigits = this.props.numberOfComments.toString().length;
        if (numDigits === 1) {
            return this.getStyleJSON(21);
        } else if (numDigits === 2) {
            return this.getStyleJSON(18);
        } else if (numDigits === 3) {
            return this.getStyleJSON(15);
        } return this.getStyleJSON(14);
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
                    size={45}
                    color={fColor}
                />
                <Text style={this.textStyleDynamic()}>{numberOfComments}</Text>
            </View>
        );
    }
}

const styles = {
    container: {
        alignItems: 'center',
        height: 40,
        width: 50,
    },
};

// Make the compoent available to other parts of the app
export { CommentButton };
