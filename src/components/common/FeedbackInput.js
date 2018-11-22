// Import a library to help create a component
import React from 'react';
import { View, TextInput, Modal, TouchableHighlight, Text, Alert } from 'react-native';

import { IconButton, Button } from '.';
import apiUtils from '../../api/apiUtils';
import utils from '../../utils/utils';

import Colors from '../../constants/Colors';

// Make a component
class FeedbackInput extends React.Component {

    state = {
        modalVisible: true,
        feedback: '',
    };

    async transmitFeedback() {
        const userhashGet = await utils.getUserParameter('hash');
        apiUtils.transmitFeedback(userhashGet, this.state.feedback);
        this.setState({ modalVisible: !this.state.modalVisible });
        this.props.handleToUpdate();
      }

    render() {
        const {
            modalStyle,
            containerStyle,
            textInputStyle,
            welcomeTextStyle,
            buttonStyle,
        } = styles;

        return (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { Alert.alert('Modal has been closed.'); }}
                >
                    <View style={containerStyle}>
                        {/* <View style={buttonStyle}> */}
                        <Text style={welcomeTextStyle}>Wir freuen uns über dein Feedback!</Text>
                        <TextInput
                            style={textInputStyle}
                            multiline={true}
                            underlineColorAndroid={'transparent'}
                            placeholder='Dein Kommentar'
                            onChangeText={text => {
                                this.setState({ feedback: text });
                                }
                            }
                        />
                        <View style={buttonStyle}>
                            <Button
                                buttonText={'Feedback senden!!!'}
                                onPress={() => this.transmitFeedback()}
                            />
                        </View>
                    </View>
                </Modal>
        );
    }
}

const styles = {
    modalStyle: {
        flex: 1,
        backgroundColor: 'red',
    },
    containerStyle: {
        height: 220,
        // flex: 1,
        margin: 20,
        padding: 10,
        backgroundColor: Colors.containerColor,
    },
    textInputStyle: {
        flex: 2,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        margin: 5,
        // padding: 5,
        // fontSize: 14,
        // alignSelf: 'center',
    },
    welcomeTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'center',
        width: '70%',
    },
};

// Make the compoent available to other parts of the app
export { FeedbackInput };
