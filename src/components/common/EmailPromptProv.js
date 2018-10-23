import React from 'react';
import { AsyncStorage, View } from 'react-native';

// import Prompt from 'rn-prompt';
import { Prompt } from '../common';

import apiUtils from '../../api/apiUtils';
import utils from '../../utils/utils';
import settings from '../../../settings';

const API_ENDPOINT_ADD_USER = settings.getBackendHost().concat('/api/user');

const promptTitle = 'Bitte gib deine E-Mail Adresse an';
const promtPlaceholder = 'me@myself.ii';
const promtSubmitButtonText = 'Absenden';
const promtCancelButtonText = 'Abbrechen';
const promtErrorText = 'Ungültig';
// const promtPrimaryColor = 'black';

const usernameG = 'noname';

class EmailPromptProv extends React.Component {

    state = { 
        promptValue: '',
        visiblePrompt: true,
        inputError: false,
        userEmail: '',
    };

    componentWillMount() {
        this.loadingAsync();
    }

    async loadingAsync() {
        const usermailGet = await utils.getUserParameter('email');
        
        this.setState({ 
          userEmail: usermailGet,
         });
      }

    async tranmitUserData() {
        const oneSignalPlayId = await utils.getPlayId();
        //TODO: Rebuild with axios
        return fetch(API_ENDPOINT_ADD_USER, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                user: {
                    username: usernameG,
                    useremail: this.state.promptValue,
                    onesignalid: oneSignalPlayId,
                },
            })
        })
        .then(response => response.json())
        //TODO: Change JSON generation logic
        .then(data => {
            const userdata = utils.makeUserJSON(
                usernameG, 
                this.state.promptValue, 
                data.user_hash, 
                oneSignalPlayId
            );
            console.log('Userdata after Prompt: ' + userdata);
            AsyncStorage.setItem('userdata', JSON.stringify(userdata));
            this.props.initialUserhashHandler(data.user_hash);
        });
    }

    renderPrompt() {
        if (this.state.userEmail === null) {
            if (this.state.inputError) {
                return (
                    <Prompt
                        title={promptTitle}
                        placeholder={promtPlaceholder}
                        visible={this.state.visiblePrompt}
                        submitText={promtSubmitButtonText}
                        cancelText={promtCancelButtonText}
                        defaultValue={promtErrorText}
                        onChangeText={(text) => {
                            this.setState({ 
                                promptValue: text 
                            });
                        }}
                        onCancel={() => this.setState({
                            visiblePrompt: false,
                        })}
                        onSubmit={() => {
                            if (utils.validateEmail(this.state.promptValue)) {
                                console.log('Mail is valid!');
                                this.setState({
                                    visiblePrompt: false,
                                    inputError: false,
                                }, () => { 
                                    this.tranmitUserData();
                                });
                            } else {
                                console.log('Mail is NOT valid!');
                                this.setState({
                                    inputError: true,
                                });
                            }
                        }}
                    />
                );
            } return (
                <Prompt
                    title={promptTitle}
                    placeholder={promtPlaceholder}
                    visible={this.state.visiblePrompt}
                    submitText={promtSubmitButtonText}
                    cancelText={promtCancelButtonText}
                    onChangeText={(text) => {
                        this.setState({ 
                            promptValue: text 
                        });
                    }}
                    onCancel={() => this.setState({
                        visiblePrompt: false,
                    })}
                    onSubmit={() => {
                        if (utils.validateEmail(this.state.promptValue)) {
                            console.log('Mail is valid!');
                            this.setState({
                                visiblePrompt: false,
                                inputError: false,
                            }, () => { 
                                this.tranmitUserData();
                            });
                        } else {
                            console.log('Mail is NOT valid!');
                            this.setState({
                                inputError: true,
                            });
                        }
                    }}
                />
            );
        }
    }

    render() {
        // console.log(this.state);
        return (
            <View>
                {this.renderPrompt()}
            </View>
        );
    }
}

// Make the compoent available to other parts of the app
export { EmailPromptProv };
