// Import a library to help create a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
const InstructionText = ({ title, text }) => {
    const { container, titleStyle, textStyle } = styles;

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={container}>
                <Text style={titleStyle}>
                    {title}
                </Text>
                <Text style={textStyle}>
                    {text}
                </Text>
            </View>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#e06803',
        padding: 5,
    },
    titleStyle: {
        // color: 'black',
        // alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    textStyle: {
        // color: 'black',
        fontSize: 16,
    }
};


// Make the compoent available to other parts of the app
export { InstructionText };
