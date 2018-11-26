import React, { Component } from 'react';
import {
   View,
   TouchableOpacity,
   StyleSheet,
   Linking,
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

const API_ENDPOINT_ALL = settings.getBackendHost().concat('/api/get/all');

export default class RecorderScreen extends Component {
 static navigationOptions = {
   title: 'Aufnahme',
 };

constructor(props) {
  super(props);
  this.editVisibilityHandlerRS = this.editVisibilityHandlerRS.bind(this);
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
   axios.get(API_ENDPOINT_ALL, {
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

returnFromEditingRecording() {
  this.setState({ 
    screenMode: 0,
  });  
}

editVisibilityHandlerRS(recording) {
  this.setState({ 
    selectedRecording: recording,
    screenMode: 2,
  });  
  console.log('editVisibitly in Recorder Screen');
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
            onPress={this.returnFromEditingRecording.bind(this)}
            // updateAuthor={apiUtils.updateAuthor.bind(this)}
            // updateAuthor={this.updateAuthor.bind(this)}
            // updateAuthor={this.updateTitle.bind(this)}
            // updateTitle={apiUtils.updateTitle.bind(this)}
          />
        </View>
      </View>
    );
  }
}

renderRecordButton() {
  if (this.state.recording && this.state.screenMode === 1) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.toggleRecording()}
        >
          <Text>STOP</Text>
        </TouchableOpacity>
        <IconButton 
            onPress={this.minimizeRecorder.bind(this)}
            name='arrow-round-up'
            size={45}
            type='ionicon'
            color='red'
        />
      </View>
      
    );
  } else if (this.state.recording && this.state.screenMode === 0) {
    return (
      <TouchableOpacity
        onPress={() => this.toggleRecording()}
      >
        <Text>STOP</Text>
      </TouchableOpacity>
    );
  } return (
    <TouchableOpacity
      onPress={() => this.toggleRecording()}
    >
      <Text>START</Text>
    </TouchableOpacity>
  );
}

 render() {
  const {
    recorderStyle,
  } = styles;
  console.log(this.state.selectedRecording);
  const url = 'http://www.belavo.co/';
  return (
    <View style={styles.container}>
      <View style={recorderStyle}>
        {/* <Button
          buttonText={'Aufnahme'}
          onPress={() => Linking.openURL(url)}
        /> */}
        {/* {this.renderRecordButton()} */}
        <Recorder />
      </View>
     {this.renderRecordingsInfo()}
    </View>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
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
