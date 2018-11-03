// Import a library to help create a component
import React from 'react';
import { View, TextInput } from 'react-native';

import { IconButton } from '.';

// Make a component
class CommentInput extends React.Component {

    state = {
        comment: '',
    };

    render() {
        const {
            containerStyle,
            textInputStyle,
        } = styles;

        return (
            <View style={containerStyle}>
                {/* <View style={textInputContainerStyle} /> */}
                <TextInput
                    style={textInputStyle}
                    multiline={true}
                    underlineColorAndroid={'transparent'}
                    placeholder='Dein Kommentar'
                    onChangeText={text => {
                        this.setState({ comment: text });
                        }
                    }
                />
                <IconButton 
                    onPress={this.props.onPress}
                    name='add'
                    size={45}
                    type='ionicon'
                    color='grey'
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        borderColor: 'black',
        borderTopWidth: 1,
        paddingTop: 5,
    },
    textInputStyle: {
        flex: 1,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        margin: 5,
        padding: 5,
        fontSize: 14,
        alignSelf: 'center',
    },
};

// Make the compoent available to other parts of the app
export { CommentInput };
