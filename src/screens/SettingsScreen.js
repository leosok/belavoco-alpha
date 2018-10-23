import React, { Component } from 'react';
import { View, 
  Text, 
  StyleSheet, 
  AsyncStorage,
  Switch } from 'react-native';

import { 
  Card, 
  CardSection,
  Button,
  ChangeInput,
  } from '../components/common';

import playerUtils from '../player/playerUtils';
import utils from '../utils/utils';
import apiUtils from '../api/apiUtils';
import settings from '../../settings';

import Colors from '../constants/Colors';

const DEBUG_STATE = settings.getDebugState();

export default class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };
  
  constructor(props) {
    super(props);
    this.updateUsername.bind(this);
    this.updateUserEmail.bind(this);
  }

  state = { 
    loading: true,
    userData: '',
    autoplay: false,
    debug: DEBUG_STATE,
  };

  componentWillMount() {
    this.loadingAsync();
  }

  async loadingAsync() {
    const userdataGet = await utils.getUserParameter('all');
    const autoplayGet = await playerUtils.loadAutoplayStatus();

    this.setState({ 
      userData: userdataGet,
      autoplay: autoplayGet
     });
  }

  async toggleAutoplayState(value) {
    this.setState({ autoplay: value });
    await AsyncStorage.setItem('autoplay', JSON.stringify(value));
  }

  async updateUsername(someArg) {
    const userdataGet = await utils.updateUserJSON('name', someArg);
    this.setState({ userData: userdataGet });
    apiUtils.updateUserData(userdataGet);
  }

  async updateUserEmail(someArg) {
    const userdataGet = await utils.updateUserJSON('email', someArg);
    this.setState({ userData: userdataGet });
  }

  renderDebugFeature() {
    if (this.state.debug === true) {
      return (
        <Card>
          <CardSection>
            <Button
              buttonText={'Logout'}
              onPress={() => utils.logoutUserInDebug()}
            />
          </CardSection>
        </Card>
      );
    }
  }

  render() {
    // console.log(this.state);
    const { container, buttonContainer, infoContainer, titleStyle } = styles;
    const updateUsername = this.updateUsername;
    // const updateUserEmail = this.updateUserEmail;
    return (
      <View style={container}>
        <Card>
          <CardSection>
            <View style={infoContainer}>
              <Text style={titleStyle}>{'Name: ' + this.state.userData.username}</Text>
            </View>
            <View style={buttonContainer}>
              <ChangeInput 
                buttonText={'Ändern'}
                promptTitle={'Dein Name'}
                handleToUpdate={updateUsername.bind(this)}
              />
            </View>
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <View style={infoContainer}>
              <Text style={titleStyle}>{'E-mail: ' + this.state.userData.useremail}</Text>
            </View>
            {/* <View style={buttonContainer}>
              <ChangeInput 
                  buttonText={'Ändern'}
                  promptTitle={'Deine E-Mail Adresse'}
                  handleToUpdate={updateUserEmail.bind(this)}
              />
            </View> */}
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <View style={infoContainer}>
              <Text style={titleStyle}>{'Autoplay: '}</Text>
            </View>
            <View style={buttonContainer}>
              <Switch 
                onValueChange={(value) => this.toggleAutoplayState(value)}
                value={this.state.autoplay}
              /> 
            </View>
          </CardSection>
        </Card>
        {this.renderDebugFeature()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    // backgroundColor: '#e6ecf7',
    backgroundColor: Colors.containerColor,
  },
  infoContainer: {
    justifyContent: 'center',
    flex: 2,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  textContainer: {
    //justifyContent: 'space-around',
    //flexDirection: 'row',
    backgroundColor: '#fff',
  },
  titleStyle: {
      fontSize: 19,
      fontWeight: '400',
  },
});
