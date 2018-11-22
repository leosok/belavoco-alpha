// Import a library to help create a component
import React from 'react';
import moment from 'moment';
import {
    Text,
    View,
    } from 'react-native';

import {
    Card,
    CardSection,
    InfoIcon,
    IconButton, 
    ToggleButton
    } from './common';

import settings from '../../settings';
import apiUtils from '../api/apiUtils';

// Make a component
class RecordingDetail extends React.Component {
    constructor(props) {
        super(props);
        // this.likeHandler = this.likeHandler.bind(this);
      }

    state = {
        selectedAudiobook: null,
        activity: this.props.recording.activity,
    }

    activityHandler() {
        this.setState({
            activity: !this.state.activity
        });
      }

    // startPlayPress = () => {
    //     this.props.selectionHandlerList(null);
    //     this.props.selectionHandlerList(this.props.audiobook);
    //   }

    toggleEditVisibility() {
        this.props.editVisibilityHandlerList(this.props.recording);
    }

    changeData() {
        console.log('CHANGE DATA!!!!');
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
            is_active
        } = this.props.recording;

        const {
            textContainerColumn,
            textContainerRow,
            authorStyle,
            readerStyle,
            infoContainer,
            titleStyle,
            buttonsContainer,
        } = styles;

        return (
            // <TouchableOpacity onPress={this.startPlayPress}>

            <Card>
                <CardSection>
                    <View style={infoContainer}>
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
                    </View>
                    <View style={buttonsContainer}>
                        <ToggleButton
                            someArg={hash}
                            size={30}
                            // toggled={true}
                            toggled={is_active}

                            // colorLike='grey'
                            // toggleHandler={toggleHandler.bind(this)}
                            toggledIcon={'ios-eye'}
                            noToggledIcon={'ios-eye-off'}
                            noToggledColor={'red'}
                            toggleSomething={apiUtils.toggleActivity.bind(this)}
                        />
                        <IconButton 
                            onPress={this.toggleEditVisibility.bind(this)}
                            name='list'
                            size={30}
                            type='ionicon'
                            color='grey'
                        />
                    </View>
                </CardSection>
            </Card>


            // </TouchableOpacity>
        );
    }
}

const styles = {
    infoContainer: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        flex: 4
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
    buttonsContainer: {
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        // flex: 1,
    },
};

// Make the compoent available to other parts of the app
export default RecordingDetail;
