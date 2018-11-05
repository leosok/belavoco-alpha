// Import a library to help create a component
import React from 'react';
import { View, TextInput } from 'react-native';

import { IconButton } from '.';
import apiUtils from '../../api/apiUtils';
import utils from '../../utils/utils';

// Make a component
class CommentInput extends React.Component {

    state = {
        comment: '',
        visible: false,
    };

    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
    }

    async transmitComment() {
        const userhashGet = await utils.getUserParameter('hash');
        this.toggleVisibility();
        this.props.remoteRefresh('addComment');
        apiUtils.transmitComment(this.props.trackhash, userhashGet, this.state.comment);
    }

    renderInput(containerStyle, textInputStyle) {
        if (this.state.visible === false) {
            return (
                <IconButton 
                    onPress={this.toggleVisibility.bind(this)}
                    name='add'
                    size={45}
                    type='ionicon'
                    color='grey'
                />
            );
        }
        return (
            <View style={containerStyle}>
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
                    onPress={this.transmitComment.bind(this)}
                    name='checkmark'
                    size={45}
                    type='ionicon'
                    color='grey'
                />
            </View>
        );
    }

    render() {
        const {
            containerStyle,
            textInputStyle,
        } = styles;

        return (
            <View style={containerStyle}>
                {this.renderInput(containerStyle, textInputStyle)}
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        alignSelf: 'center',
        // borderColor: 'black',
        // borderTopWidth: 1,
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
