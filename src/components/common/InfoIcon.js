// Import a library to help create a component
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

// Make a component
class InfoIcon extends React.Component {

    render() {
        return (
            <View style={styles.containerStyle}>
                <Icon
                    name={this.props.name}
                    size={parseInt(this.props.size) || 17}
                    type={this.props.type}
                    style={{marginRight: parseInt(this.props.extraMargin) || 0 }}
                    color="grey"
                />
                <Text style={styles.textStyle}>
                    {this.props.text}
                </Text>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginRight: 15,
    },
    textStyle: {
        fontSize: 12,
        marginLeft: 2,
    },
};

// Make the compoent available to other parts of the app
export { InfoIcon };
