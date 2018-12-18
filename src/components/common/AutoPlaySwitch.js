// Import a library to help create a component
import React from 'react';
import { View,
         Switch, 
         AsyncStorage 
        } from 'react-native';

import playerUtils from '../../player/playerUtils';

// Make a component
class AutoPlaySwitch extends React.Component {

    state = {
        autoplay: true,
    };

    componentDidMount() {
        this.loadingAsync();
      }
    
      async loadingAsync() {
        const autoplayGet = await playerUtils.loadAutoplayStatus();
    
        this.setState({ 
          autoplay: autoplayGet
         });
      }

    async toggleAutoplayState(value) {
        this.setState({ autoplay: value });
        await AsyncStorage.setItem('autoplay', JSON.stringify(value));
    }

    render() {
        const {
            containerStyle,
        } = styles;

        return (
            <View style={containerStyle}>
              <Switch 
                onValueChange={(value) => this.toggleAutoplayState(value)}
                value={this.state.autoplay}
              /> 
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    textInputStyle: {
        // flex: 1,
        // padding: 5,
        // borderColor: 'grey',
        // borderRadius: 20,
        // borderWidth: 1,
        // fontSize: 20,
        // alignSelf: 'center',
        // color: '#f4424e'
    },
};

// Make the compoent available to other parts of the app
export { AutoPlaySwitch };
