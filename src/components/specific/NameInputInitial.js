import React from 'react';
import { AsyncStorage, View } from 'react-native';

// import Prompt from 'rn-prompt';
import { Prompt } from '../common';

import apiUtils from '../../api/apiUtils';
import utils from '../../utils/utils';
import settings from '../../../settings';

const API_ENDPOINT_ADD_USER = settings.getBackendHost().concat('/api/user');

const promptTitle = 'Jetzt fehlt uns nur noch dein Name!';
const promtPlaceholder = 'Dein Name';
const promtSubmitButtonText = 'Absenden';
const promtCancelButtonText = 'Abbrechen';
const promtErrorText = 'Ungültige Eingabe';
// const promtPrimaryColor = 'black';

const usernameG = 'noname';

class NameInputInitial extends React.Component {

    state = {
        promptValue: '',
        visiblePrompt: true,
        placeholder: promtPlaceholder,
        userName: '',
    };

    componentWillMount() {
        this.loadingAsync();
    }

    async loadingAsync() {
        const usernameG = await utils.getUserParameter('name');

        this.setState({
          userName: usernameG,
         });
      }

    async setUserName() {
        console.log('Setting User Name to ' + this.state.promptValue);
        const userdataGet = await utils.updateUserJSON('name', this.state.promptValue);
        this.setState({ userName: this.state.promptValue });
        apiUtils.updateUserData(userdataGet);
    }

    renderPrompt() {
        if (this.state.userName === (null || undefined) || this.state.userName === 'noname') {
            return (
                <Prompt
                    title={promptTitle}
                    placeholder={this.state.placeholder}
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
                        if (this.state.promptValue !== '') {
                            console.log('Name is valid!');
                            this.setState({
                                visiblePrompt: false,
                            }, () => {
                                this.setUserName();
                            });
                        } else {
                            console.log('Name empty!');
                            this.setState({
                                placeholder: promtErrorText
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
export { NameInputInitial };
