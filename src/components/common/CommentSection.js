// Import a library to help create a component
import React from 'react';
import { View, ScrollView } from 'react-native';

import { CommentInput } from '.';

import Colors from '../../constants/Colors';

// Make a component
const CommentSection = (props) => {

    const {
        containerStyle,
        scrollStyle,
    } = styles;

    return (
        <View style={containerStyle}>
            <ScrollView style={scrollStyle}>
                {props.children}
            </ScrollView>
            <CommentInput />
        </View>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
        padding: 5,
        margin: 15,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: Colors.containerColor,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 2,
        // elevation: 1
    },
    scrollStyle: {
        // borderColor: 'black',
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
    },
};


// Make the compoent available to other parts of the app
export { CommentSection };
