// Import a library to help create a component
import React from 'react';
import { 
    View, 
    Text, 
    TouchableWithoutFeedback, 
    TextInput, 
    Platform,
    KeyboardAvoidingView 
} from 'react-native';
import { Icon } from 'react-native-elements';

const empty = 'Keine Angabe';

// Make a component
class TextInputTranmit extends React.Component {  
    state = {
        inputActiv: this.props.inputActiv || false,
        inputText: '',
        text: this.props.text,
        placeholder: this.props.placeholder,
      };

    toggleInputActivity() {
        this.setState({ inputActiv: !this.state.inputActiv });
    }

    inputDone() {
        this.toggleInputActivity();
        if (this.props.returnText) {
            console.log(1);
            this.setState({ 
                text: this.state.inputText,
            },
                this.props.returnText(this.state.inputText)
            );
        } else {
            console.log(2);
            this.setState({ text: this.state.inputText });
        }
        this.setState({ placeholder: this.state.inputText });     
        console.log('in TextInputTranmit.js: INPUT DONE!!!');
    }

    renderTextOrInput() {
        const {
            textInputStyle,
            textStyle,
          } = styles;

        if (this.state.inputActiv) {
            return (
                <View style={styles.containerStyle}>
                    <Text style={styles.titleStyle}>
                        {this.props.title}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: '85%' }}>
                            <TextInput
                                style={textInputStyle}
                                height={30}
                                paddingLeft={5}
                                // multiline={true}
                                underlineColorAndroid={'transparent'}
                                placeholder={this.state.placeholder}
                                onChangeText={text => {
                                    this.setState({ inputText: text });
                                    }
                                }
                            />
                        </View>
                        <View style={{ width: '15%' }}>
                            <Icon 
                                onPress={() => this.inputDone()}
                                name='check-circle'
                                size={30}
                                type='materialicons'
                                color='grey'
                            />
                        </View>
                    </View>
                    
                </View>
            );
        } return (
            <TouchableWithoutFeedback onPress={() => this.toggleInputActivity()}>
                <View style={styles.containerStyle}>
                    <View>
                        <Text style={styles.titleStyle}>
                            {this.props.title}
                        </Text>
                        <Text style={textStyle}>
                            {this.state.text}
                        </Text>
                    </View>
                </View>  
            </TouchableWithoutFeedback>         
        );
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                {this.renderTextOrInput()}
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        marginBottom: 10,
    },
    textInputStyle: {
        fontSize: 20,
        marginLeft: 5,
        backgroundColor: 'white',
        height: 30,
    },
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    textStyle: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },
};

// Make the compoent available to other parts of the app
export { TextInputTranmit };
