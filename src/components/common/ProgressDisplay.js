// Import a library to help create a component
import React from 'react';
import moment from 'moment';
import { View, Text } from 'react-native';

// Make a component
const ProgressDisplay = (props) => {
    const {
        fontStyle,
    } = styles;

    return (
        <View>
            <Text style={fontStyle}>
                {moment().startOf('day').seconds(props.position).format('mm:ss')}
                /
                {moment().startOf('day').seconds(props.length).format('mm:ss')}
            </Text>
        </View>
    );
};

const styles = {
    fontStyle: {
        fontSize: 12,
        marginLeft: 5,
    },
};

// Make the compoent available to other parts of the app
export { ProgressDisplay };
