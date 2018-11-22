import React, { Component } from 'react';
import {
   View,
   ScrollView,
   StyleSheet,
   Linking,
   Text
   } from 'react-native';

import axios from 'axios';

// import AudiobookList from '../components/AudiobookList';
import RecordingList from '../components/RecordingList';
import { Button, Spinner, RecordingEdit } from '../components/common';

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
   screenMode: 0, // Modes: 0 - recording + info; 1 - recording only; 2 - recording + info (edit mode)
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

// updateAuthor() {
//   apiUtils.updateAuthor(this.state.selectedRecording.hash);
// }

// updateTitle() {
//   apiUtils.updateTitle(this.state.selectedRecording.hash);
// }

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
  } = styles;

  if (this.state.screenMode === 0) {
    return (
      <View style={{ flex: 9 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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

 render() {
  console.log(this.state.selectedRecording);
  const url = 'http://www.belavo.co/';
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <Button
          buttonText={'Aufnahme'}
          onPress={() => Linking.openURL(url)}
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
     paddingTop: 15,
     backgroundColor: Colors.containerColor
   },
   seperatorTextStyle: {
     fontSize: 18,
   },
 });
