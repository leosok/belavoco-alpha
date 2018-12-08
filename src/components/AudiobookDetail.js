// Import a library to help create a component
import React from 'react';
import moment from 'moment';
import {
    Text,
    View,
    TouchableOpacity,
    } from 'react-native';

import {
    Card,
    CardSection,
    InfoIcon,
    LikeButtonGeneric,
    CommentButton } from './common';

import settings from '../../settings';
import apiUtils from '../api/apiUtils';

// Make a component
class AudiobookDetail extends React.Component {
    constructor(props) {
        super(props);
        // this.likeHandler = this.likeHandler.bind(this);
      }

    state = {
        selectedAudiobook: null,
        // like: this.props.audiobook.liked,
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props !== nextProps) {
    //         this.setState({
    //             like: nextProps.audiobook.liked,
    //         });
    //     }
    // }

    // async likeHandler(alterLike) {
    //     this.setState({
    //         like: !this.state.like
    //     });
    //     this.props.audiobook.times_liked = this.props.audiobook.times_liked + alterLike;
    //   }

    startPlayPress() {
        // '' ensures the Player to replay a track that is reclicked by setStating 
        // seletedAudiobook in MediaScreen.js(refer to Audioplayer.js and playerUtils.js)
        this.props.selectionHandlerList('');
        setTimeout(() => this.props.selectionHandlerList(this.props.audiobook), 50);
      }

    commentPress() {
        this.props.showCommentsHandler(this.props.audiobook);
    }

      render() {
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
        } = this.props.audiobook;

        const {
            textContainerColumn,
            textContainerRow,
            authorStyle,
            readerStyle,
            infoContainer,
            titleStyle,
            buttonContainer
        } = styles;

        const likeHandler = this.likeHandler;
        // const addLike = this.addLike;
        // const substractLike = this.substractLike;

        return (
            <View>
            {/* <TouchableOpacity onPress={() => this.startPlayPress()}> */}
            <Card>
                <CardSection>
                    {/* <View style={infoContainer}> */}
                    <TouchableOpacity 
                        onPress={() => this.startPlayPress()}
                        style={infoContainer}
                    >
                        <View>
                            <Text style={authorStyle}>{author}</Text>
                            <Text numberOfLines={1} style={titleStyle}>{title}</Text>
                        </View>
                        <View style={textContainerColumn}>
                            <Text numberOfLines={1} style={readerStyle}>Es liest {reader}</Text>
                            <View style={textContainerRow}>

                                <InfoIcon
                                    type="evilicon"
                                    name="clock"
                                    text={moment().startOf('day')
                                    .seconds(length)
                                    .format('mm:ss')}
                                    extraMargin='3'
                                />

                                <InfoIcon
                                    type="materialicon"
                                    name="replay"
                                    text={times_played}
                                />

                                <InfoIcon
                                    type="evilicon"
                                    name="like"
                                    text={times_liked}
                                />
                            </View>
                        </View>
                    {/* </View> */}
                    </TouchableOpacity>
                    {/* <LikeButtonGeneric
                        hash={hash}
                        size={45}
                        like={this.state.like}
                        // colorLike='grey'
                        likeHandler={likeHandler.bind(this)}
                        addLike={apiUtils.addLike.bind(this)}
                        substractLike={apiUtils.substractLike.bind(this)}
                    /> */}
                    <TouchableOpacity 
                        style={buttonContainer} 
                        onPress={() => this.commentPress()}
                    >
                        <CommentButton 
                            onPress={() => this.commentPress()}
                            numberOfComments={3}
                            // numberOfComments={times_played}
                        />
                    </TouchableOpacity>
                    
                </CardSection>
            </Card>
            </View>
            // {/* </TouchableOpacity> */}
        );
    }
}

const styles = {
    infoContainer: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        flex: 5,
    },
    buttonContainer: { 
        justifyContent: 'flex-start', 
        flex: 1 
    },
    playedContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainerColumn: {
        flexDirection: 'column',
        justifyContent: 'space-around',

    },
    textContainerRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 8,
        marginTop: 6,
    },
    authorStyle: {
        fontSize: 15,
        marginLeft: 8,
    },
    titleStyle: {
        fontSize: 17,
        marginLeft: 8,
        flex: 1,
    },
    readerStyle: {
        fontSize: 12,
        marginLeft: 8,
        flex: 1,
    },
    playedStyle: {
        fontSize: 30,
        alignSelf: 'center',
        marginLeft: 5,
        marginRight: 5
    },
};

// Make the compoent available to other parts of the app
export default AudiobookDetail;
