// Import a library to help create a component
import React from 'react';
import { View, Text } from 'react-native';
import { Button, ChangeInput, TextInputTranmit } from '.';

import utils from '../../utils/utils';
import apiUtils from '../../api/apiUtils';

import Colors from '../../constants/Colors';

// Make a component
// const RecordingEdit = ({ recording, onPress, updateAuthor, updateTitle }) => {
class RecordingEdit extends React.Component {

    state = {
        recording: this.props.recording,
    }

    updateTitle(title) {
        console.log('updateTitle from RecordingEdit');
        console.log(title);    
        const updateData = utils.makeUpdateRecordingJSON(this.state.recording.author, title, this.state.recording.reader);
        this.updateRecording(updateData);
    }

    updateAuthor(author) {
        console.log('updateAuthor from RecordingEdit');
        console.log(author);
        const updateData = utils.makeUpdateRecordingJSON(author, this.state.recording.title, this.state.recording.reader);
        this.updateRecording(updateData);
    }

    updateReader(reader) {
        console.log('updateReader from RecordingEdit');
        console.log(reader);
        const updateData = utils.makeUpdateRecordingJSON(this.state.recording.author, this.state.recording.title, reader);
        this.updateRecording(updateData);
    }

    async updateRecording(updateData) {
        let i; 
        const newRecordings = await apiUtils.updateRecording(this.state.recording.hash, updateData);
        this.props.refreshRecordingsHandler(newRecordings);
        for (i = 0; i < Object.keys(this.state.recording).length; i++) {
            if (this.state.recording.hash === newRecordings[i].hash) {
                this.setState({ recording: newRecordings[i] });
            }
        }
    }

    render() {
    const {
        container,
        lineStyle,
        itemStyle,
        textStyle,
        buttonContainer,
        textContainer
      } = styles;

      const {
        id,
        author,
        title,
        reader,
        file_url,
        hash,
        times_liked,
        times_played,
        length,
        is_active
      } = this.state.recording;

        return (
            <View style={container}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.parameterInput}>
                        <TextInputTranmit 
                            returnText={this.updateTitle.bind(this)}
                            title='Titel:'
                            text={title}
                            inputColor={Colors.containerColor}
                        />
                        <TextInputTranmit 
                            returnText={this.updateAuthor.bind(this)}
                            title='Autor:'
                            text={author}
                            inputColor={Colors.containerColor}
                            
                        />
                        <TextInputTranmit 
                            returnText={this.updateReader.bind(this)}
                            //TODO: updateReader muss auch eingeführt werden auf Server API
                            title='Gelesen von:'
                            text={reader}
                            inputColor={Colors.containerColor}
                        />
                        <View style={{ height: 40 }}>
                            <Button
                                buttonText={'Zurück'}
                                onPress={this.props.onPress}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginLeft: 5,
        marginRight: 5,
    },
    parameterInput: {
        flex: 1,
      },
    lineStyle: {
        flex: 2,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 5,
        alignItems: 'center',
        borderColor: '#ddd',
        borderBottomWidth: 1,
    },
    itemStyle: {
        fontWeight: 'bold',
    },
    textStyle: {
        fontSize: 18,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 4,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1,
    },
};

// Make the compoent available to other parts of the app
export { RecordingEdit };
