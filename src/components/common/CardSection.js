// Import a library to help create a component
import React from 'react';
import { View } from 'react-native';

import Colors from '../../constants/Colors';

const paddingCS = 5;
const justifyCS = 'flex-start';
const flexDirCS = 'row';
const borderColorCS = '#ddd';
const positionCS = 'relative';
// Make a component
// const CardSection = (props) => {
class CardSection extends React.Component {
    
    setBackgroundColor() {
        if (this.props.isNew) {
            return {
                padding: paddingCS, 
                justifyContent: justifyCS,
                flexDirection: flexDirCS,
                borderColor: borderColorCS,
                position: positionCS,
                backgroundColor: Colors.newAudioFile,
                };
        } return {
            padding: paddingCS, 
            justifyContent: justifyCS,
            flexDirection: flexDirCS,
            borderColor: borderColorCS,
            position: positionCS,
            backgroundColor: '#fff',
        };
    }

    render() {
        console.log(this.props);
        return (
            // <TouchableOpacity>
                <View style={this.setBackgroundColor()}>
                    {this.props.children}
                </View>
            // </TouchableOpacity>
        );
    }
}

const styles = {
    containerStyle: {
        // borderBottomWidth: 1,
        padding: 5, 
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
        backgroundColor: Colors.newAudioFile,
    },
};


// Make the compoent available to other parts of the app
export { CardSection };
