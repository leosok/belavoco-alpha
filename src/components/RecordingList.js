// Import a library to help create a component
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
// import AudiobookDetail from './AudiobookDetail';
import RecordingDetail from './RecordingDetail';

class RecordingList extends Component {
    constructor(props) {
        super(props);
        this.selectionHandlerList = this.selectionHandlerList.bind(this);
        this.editVisibilityHandlerList = this.editVisibilityHandlerList.bind(this);
      }

    state = { 
        selectedAudiobook: null,
    }

    selectionHandlerList(audiobookToPlay) {
        this.setState({ selectedAudiobook: audiobookToPlay },
        this.props.selectionHandlerMediaScreen(audiobookToPlay),
        );        
    }

    editVisibilityHandlerList(recording) {
        this.props.editVisibilityHandlerRS(recording);
    }

      renderRecordings(selectionHandlerList, editVisibilityHandlerList) {
        return (
            this.props.recordings.map(recording => 
                <RecordingDetail 
                    key={recording.id} 
                    recording={recording} 
                    selectionHandlerList={selectionHandlerList}
                    editVisibilityHandlerList={editVisibilityHandlerList}
                    selected={this.state.selectedAudiobook}
                    localLikes={this.state.localLikes}
                />)
        );
    }

    render() {
        const selectionHandlerList = this.selectionHandlerList;
        const editVisibilityHandlerList = this.editVisibilityHandlerList;

        return (
            <View>
                <ScrollView>
                    {this.renderRecordings(selectionHandlerList, editVisibilityHandlerList)}
                </ScrollView>
            </View>
        );
    }
}

export default RecordingList;
