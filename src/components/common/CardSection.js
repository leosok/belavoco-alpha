// Import a library to help create a component
import React from 'react';
import { View, TouchableOpacity } from 'react-native';

// Make a component
const CardSection = (props) => {
    return (
        // <TouchableOpacity>
            <View style={styles.containerStyle}>
                {props.children}
            </View>
        // </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        // borderBottomWidth: 1,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
    },
};


// Make the compoent available to other parts of the app
export { CardSection };
