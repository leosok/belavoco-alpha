// Import a library to help create a component
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// Make a component
const Spinner = ({ size }) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    );
};

const styles = {
    spinnerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
};

// Make the compoent available to other parts of the app
export { Spinner };
