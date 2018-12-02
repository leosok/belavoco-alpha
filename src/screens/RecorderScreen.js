import React, { Component } from 'react';
import {
   View,
   TouchableOpacity,
   StyleSheet,
   Text
   } from 'react-native';

import axios from 'axios';

// import AudiobookList from '../components/AudiobookList';
import RecordingList from '../components/RecordingList';
import Recorder from '../components/Recorder';

import { Button, Spinner, RecordingEdit, IconButton } from '../components/common';

import settings from '../../settings';
import apiUtils from '../api/apiUtils';
import utils from '../utils/utils';

import Colors from '../constants/Colors';

const API_ENDPOINT_RECORDS = settings.getBackendHost().concat('/api/get/records');

export default class RecorderScreen extends Component {
 static navigationOptions = {
   title: 'Aufnehmen',
 };

constructor(props) {
  super(props);
  this.editVisibilityHandlerRS = this.editVisibilityHandlerRS.bind(this);
  this.refreshRecordingsHandler = this.refreshRecordingsHandler.bind(this);
  this.goToFullScreen = this.goToFullScreen.bind(this);
  this.goToStandardScreen = this.goToStandardScreen.bind(this);
}

 state = {
   loading: true,
   recordings: [],
   user: null,
   selectedRecording: null,
   screenMode: 1, // Modes: 0 - recording + info; 1 - recording only; 2 - recording + info (edit mode)
   recording: false,
 };

 componentWillMount() {
   this.loadingAsyncAndRefresh();
 }

 async loadingAsyncAndRefresh() {
   const userGet = await utils.getUserParameter('all');
  
   this.setState({ user: userGet }, () => {
     this.refreshData();
   });
 }

refreshData() {
   axios.get(API_ENDPOINT_RECORDS, {
     headers: apiUtils.getRequestHeader(this.state.user.userhash)
   })
   .then(response => this.setState({
       recordings: response.data,
       loading: false
      }))
   .catch(e => console.log(e));
}

toggleRecording() {
  // if (!this.state.recording) {
  //   this.setState({ screenMode: 1 });
  // } 
  this.setState({ recording: !this.state.recording });
}

minimizeRecorder() {
  this.setState({ screenMode: 0 });
}

goToStandardScreen() {
  this.setState({ 
    screenMode: 0,
  });  
}

goToFullScreen() {
  this.setState({ 
    screenMode: 1,
  });  
}

editVisibilityHandlerRS(recording) {
  this.setState({ 
    selectedRecording: recording,
    screenMode: 2,
  });  
}

refreshRecordingsHandler(newRecordings) {
  this.setState({ recordings: newRecordings });
}

 renderRecordings() {
  const editVisibilityHandlerRS = this.editVisibilityHandlerRS;
   if (this.state.loading) {
       return <Spinner />;
   }
   return (
     <RecordingList
       recordings={this.state.recordings}
       editVisibilityHandlerRS={editVisibilityHandlerRS}
     />
   );
 }

renderRecordingsInfo() {
  const {
    seperatorTextStyle,
    seperatorStyle,
  } = styles;

  if (this.state.screenMode === 0) {
    return (
      <View style={{ flex: 9 }}>
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
        <View style={seperatorStyle}>
          <Text style={seperatorTextStyle}>Meine Aufnahmen</Text>
        </View>
        <View style={{ flex: 8, backgroundColor: '#fff' }}>
          {this.renderRecordings()}
        </View>
      </View>
    );
  } else if (this.state.screenMode === 1) {
    return;
  } else if (this.state.screenMode === 2) {
    return (
      <View style={{ flex: 9 }}>
        <View style={seperatorStyle}>
          <Text style={seperatorTextStyle}>Meine Aufnahmen</Text>
        </View>
        <View style={{ flex: 8 }}>
          <RecordingEdit 
            recording={this.state.selectedRecording}
            onPress={this.goToStandardScreen.bind(this)}
            refreshRecordingsHandler={this.refreshRecordingsHandler.bind(this)}
          />
        </View>
      </View>
    );
  }
}

 render() {
  const {
    recorderStyle,
  } = styles;

  return (
    <View style={styles.container}>
      <View style={recorderStyle}>
        <Recorder 
          goToFullScreen={this.goToFullScreen.bind(this)}
          recordingDone={this.goToStandardScreen.bind(this)}
          screenMode={this.state.screenMode}
        />
      </View>
     {this.renderRecordingsInfo()}
    </View>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 15,
    backgroundColor: Colors.containerColor
   },
  recorderStyle: {
    flex: 3,
    alignItems: 'center', 
    justifyContent: 'center',
   },
   seperatorStyle: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderColor: 'grey',
    borderTopWidth: 1,
   },
  seperatorTextStyle: {
    fontSize: 18,
   },
 });
