// Import a library to help create a component
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// Make a component
//const ButtonSmall = ({ onPress, buttonText, buttonState }) => {
class ButtonSmall extends React.Component {

    state = { hello: 'testing' };

    // componentWillMount() {
    //     console.log('test');
    //   }

    render() {
    const { buttonStyle, textStyle } = styles;
    const { buttonText, buttonState, choiceHandler } = this.props;

        return (
            <TouchableOpacity 
                onPress={() => {
                    choiceHandler(buttonState);
                  }}
                style={buttonStyle}
            >
                <Text style={textStyle}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = {
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#e6ecf7',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#e6ecf7',
        marginLeft: 5,
        marginRight: 5
    },
    textStyle: {
        alignSelf: 'center',
        color: '#000',
        fontSize: 10,
        fontWeight: '500',
        paddingTop: 5,
        paddingBottom: 5
    }
};


// Make the compoent available to other parts of the app
export { ButtonSmall };
