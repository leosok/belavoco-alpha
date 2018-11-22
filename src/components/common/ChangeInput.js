import React, { Component } from 'react';
import { 
    Text, 
    TouchableHighlight, 
    View, 
    StyleSheet, 
    } from 'react-native';

import { Prompt } from '.';

class ChangeInput extends Component {
  state = {
    visiblePrompt: false,
    promptValue: '',
    name: ''
  };

  setPromptVisible(visible) {
    this.setState({ visiblePrompt: visible });
  }

  render() {
    const { buttonStyle, textStyle } = styles;
    const handleToUpdate = this.props.handleToUpdate;

    return (
      <View>
        <Prompt
          title={this.props.promptTitle}
          placeholder={''}
          visible={this.state.visiblePrompt}
          cancelPossible={true}
          submitText={this.props.buttonText}
          onChangeText={(text) => {
              this.setState({ 
                  promptValue: text 
              });
          }}
          onCancel={() => this.setState({
              visiblePrompt: false,
          })}
          onSubmit={() => {
            this.setState({
                visiblePrompt: false,
            }, () => { 
              handleToUpdate(this.state.promptValue);
            });
          }}
        />

        <TouchableHighlight
          style={buttonStyle}
          onPress={() => {
            this.setState({ visiblePrompt: true });
          }}
        >
          <Text style={textStyle}>{this.props.buttonText}</Text>
        </TouchableHighlight>

      </View>
    );
  }
}


const styles = StyleSheet.create({
    inputBox: {
        padding: 20,
        fontSize: 20,
        alignSelf: 'center',
        color: '#f4424e'
    },
    buttonStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
    },
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
  });

export { ChangeInput };
