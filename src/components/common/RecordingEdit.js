// Import a library to help create a component
import React from 'react';
import { View, Text } from 'react-native';
import { Button, ChangeInput } from '.';

import apiUtils from '../../api/apiUtils';

// Make a component
// const RecordingEdit = ({ recording, onPress, updateAuthor, updateTitle }) => {
class RecordingEdit extends React.Component {

    updateAuthor(author) {
        console.log('updateAuthor from RecordingEdit');
        console.log(author);
        apiUtils.updateAuthor(this.props.recording.hash, author);
    }

    updateTitle(title) {
        console.log('updateTitle from RecordingEdit');
        console.log(title);        
        apiUtils.updateTitle(this.props.recording.hash, title);
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
      } = this.props.recording;

        return (
            <View style={container}>
                <View style={lineStyle}>
                    <View style={textContainer}>
                        <Text style={itemStyle}>Titel: </Text>
                        <Text style={textStyle}>{title}</Text>
                    </View>
                    <View style={buttonContainer}>
                        <ChangeInput 
                            buttonText={'Ändern'}
                            promptTitle={'Titel ändern'}
                            handleToUpdate={this.updateTitle.bind(this)}
                        />
                    </View>
                </View>
                <View style={lineStyle}>
                    <View style={textContainer}>
                        <Text style={itemStyle}>Autor: </Text>
                        <Text style={textStyle}>{author}</Text>
                    </View>
                    <View style={buttonContainer}>
                        <ChangeInput 
                            buttonText={'Ändern'}
                            promptTitle={'Autor ändern'}
                            handleToUpdate={this.updateAuthor.bind(this)}
                        />
                    </View>
                </View>
                <View style={lineStyle}>
                    <View style={textContainer}>
                        <Text style={itemStyle}>Vorgelesen von: </Text>
                        <Text style={textStyle}>{reader}</Text>
                    </View>
                    <View style={buttonContainer} />
                </View>
                <Button
                    style={{ flex: 1 }}
                    buttonText={'Zurück'}
                    onPress={this.props.onPress}
                />
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
