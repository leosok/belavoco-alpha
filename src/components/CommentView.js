import React, { Component } from 'react';
import { 
    Text, 
    View,
    TouchableOpacity
    } from 'react-native';

import moment from 'moment';
import 'moment/locale/de';
import axios from 'axios';

import {
    CommentSection,
    Comment,
    IconButton
    } from './common';

import settings from '../../settings';
import apiUtils from '../api/apiUtils';
import utils from '../utils/utils';

import { Spinner } from './common/Spinner';

const API_ENDPOINT_COMMENTS = settings.getBackendHost().concat('/api/comment/');

class CommentView extends Component {
  state = {
    comments: [],
    loadingComments: true,
    loadingLatestComment: false,
  };

  componentDidMount() {
    this.refreshCommentData();
  }

    async refreshCommentData() {
        const userhash = await utils.getUserParameter('hash');
        // const trackhash = await TrackPlayer.getCurrentTrack();
        const endpoint = API_ENDPOINT_COMMENTS.concat(this.props.audiobook.hash);
        axios.get(endpoint, { 
        headers: apiUtils.getRequestHeader(userhash)
        })
        .then(response => this.setState({
            comments: response.data,
            loadingComments: false,
            loadingLatestComment: false,
        }))
        .catch(e => console.log(e));
    }

    remoteRefresh(mode) {
        console.log('MODE: ' + mode);
        if (mode === 'addComment') {
            this.setState({
                loadingLatestComment: true,
            });
        }
        this.refreshCommentData();
    }

    renderComments() {
        if (this.state.loadingComments === true) {
            return <Spinner />;
        } else if (this.state.loadingLatestComment === true) {
            return (
                <View>
                    <Spinner />
                    {this.renderCommentsOnly()}
                </View>
            );
        } 
        return (this.renderCommentsOnly());
    }

    renderCommentsOnly() {
        if (this.state.comments.length == 0) {
            return <Text style={styles.emptyTextStyle}>Noch keine Kommentare</Text>;
        }
        return (
            this.state.comments.map(comment => 
                <Comment 
                    key={comment.id} 
                    id={comment.id} 
                    text={comment.content} 
                    user={comment.user} 
                    // time={moment(comment.pub_date).locale('de').calendar()} 
                    time={moment(comment.pub_date).locale('de').format("DD.MM.YY")}
                    remoteRefresh={this.remoteRefresh.bind(this)}
                />)
        );
    }

    render() {
        console.log(this.state.comments);
        const {
            container,
            closeContainer,
            textContainer,
            header,
            author,
            title,
        } = styles;

        return (
            <View style={container}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={textContainer}>
                        <Text style={header}>{'Kommentare zu'}</Text>
                        <Text style={author}>{this.props.audiobook.author}</Text>
                        <Text style={title} numberOfLines={1}>{this.props.audiobook.title}</Text>
                    </View>
                    <TouchableOpacity 
                        style={closeContainer} 
                        onPress={() => this.props.hideComments()}
                    >
                        <IconButton 
                            onPress={() => this.props.hideComments()}
                            name='close'
                            size={45}
                            type='ionicon'
                            color='grey'
                        />
                    </TouchableOpacity>
                </View>
                <CommentSection
                    trackhash={this.props.audiobook.hash} 
                    remoteRefresh={this.remoteRefresh.bind(this)}
                >
                    {this.renderComments()}
                </CommentSection>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
    closeContainer: {
        alignItems: 'flex-end',
        marginRight: 10,
        flex: 1,
    },
    textContainer: {
        marginTop: 10,
        marginLeft: 10,
        flex: 10,
    },
    header: {
        fontSize: 15,
    },
    author: {
        marginTop: 5,
        marginLeft: 5,
        fontSize: 17,
    },
    title: {
        marginTop: 2,
        marginLeft: 5,
        fontSize: 19,
    },
    emptyTextStyle: {
        fontSize: 15,
        alignSelf: 'center',
    },
  };

export default CommentView;
