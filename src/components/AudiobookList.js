// Import a library to help create a component
// Import a library to help create a component
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import AudiobookDetail from './AudiobookDetail';

class AudiobookList extends Component {
    constructor(props) {
        super(props);
        this.selectionHandlerList = this.selectionHandlerList.bind(this);
        this.showCommentsHandler = this.showCommentsHandler.bind(this);
      }

    state = { 
        selectedAudiobook: null,
    }

    selectionHandlerList(audiobookToPlay) {
        this.setState({ selectedAudiobook: audiobookToPlay },
        this.props.selectionHandlerMediaScreen(audiobookToPlay),
        );        
    }

    showCommentsHandler(audiobookForComments) {
        this.props.showCommentsHandlerMediaScreen(audiobookForComments);
    }

    renderAudiobookChoice(audioBookChoice, selectionHandlerList) {
        if (audioBookChoice === 'all') {
                return (
                    this.props.audiobooks.map(audiobook => 
                        <AudiobookDetail 
                            key={audiobook.id} 
                            audiobook={audiobook} 
                            selectionHandlerList={selectionHandlerList}
                            showCommentsHandler={this.showCommentsHandler}
                            selected={this.state.selectedAudiobook}
                            localLikes={this.state.localLikes}
                        />)
                );
            }

        if (audioBookChoice === 'prose') {
            return this.props.audiobooks.map(audiobook => {
                return audiobook.text_type === 1 ?
                    <AudiobookDetail 
                        key={audiobook.id} 
                        audiobook={audiobook} 
                        selectionHandlerList={selectionHandlerList}
                        showCommentsHandler={this.showCommentsHandler}
                        selected={this.state.selectedAudiobook}
                    />
                : 
                    null;
                });
            }

        if (audioBookChoice === 'poetry') {
            return this.props.audiobooks.map(audiobook => {
                return audiobook.text_type === 2 ?
                    <AudiobookDetail 
                        key={audiobook.id} 
                        audiobook={audiobook}
                        selectionHandlerList={selectionHandlerList}
                        showCommentsHandler={this.showCommentsHandler}
                        selected={this.state.selectedAudiobook}
                    />
                : 
                    null;
                });
            }
        }

    render() {
        const selectionHandlerList = this.selectionHandlerList;
        const { audioBookChoice } = this.props;

        return (
            <View>
                <ScrollView>
                    {this.renderAudiobookChoice(
                        audioBookChoice, 
                        selectionHandlerList
                    )}
                </ScrollView>
            </View>
        );
    }
}

export default AudiobookList;
