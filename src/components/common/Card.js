// Import a library to help create a component
import React from 'react';
import { View, TouchableOpacity } from 'react-native';

// Make a component
const Card = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
    },
};


// Make the compoent available to other parts of the app
export { Card };
