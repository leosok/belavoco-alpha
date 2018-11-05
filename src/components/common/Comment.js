// Import a library to help create a component
import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';

import apiUtils from '../../api/apiUtils';

import { LikeButtonGeneric, IconButton } from '.';

import utils from '../../utils/utils';
import Colors from '../../constants/Colors';

// this.loadUserhash();

// Make a component
class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.likeHandler = this.likeHandler.bind(this);
      }

    state = {
        like: false,
        userhash: '',
    }

    async componentDidMount() {
        await this.loadInitialState();
    }

    onDelete() {
        apiUtils.deleteComment(this.state.userhash, this.props.id);
        this.props.remoteRefresh();
    }

    async loadInitialState() {
        const id = '3';
        // const id = String(this.props.comment.id);
        let likeState = await AsyncStorage.getItem('comment_'.concat(id));
        const userhashG = await utils.getUserParameter('hash');

        if (likeState === null) {
          likeState = false;
        }

        this.setState({
            like: likeState,
            userhash: userhashG
        });
    }

    async likeHandler() {
        //MUSS SPÄTER UMGESTELLT WERDEN, UM LIKE FÜR DEN RICHTIGEN KOMMENTAR ZU SETZEN
        // const id = String(this.props.comment.id);
        const id = '3';

        this.setState({
            like: !this.state.like
        }, () => {
            AsyncStorage.setItem('comment_'.concat(id), JSON.stringify(this.state.like));
            });
      }

    renderDeleteButton() {
        // console.log('renderDeleteButton');
        // console.log(this.props);
        if (this.props.user.hash === this.state.userhash) {
            //TODO: Hier Comment Delete Funktion einfügen
            return (
                <IconButton 
                    onPress={() => this.onDelete()}
                    name='trash'
                    size={20}
                    type='ionicon'
                    color='grey'
                />
            );
        }
    }

    render() {
        const {
            containerStyle,
            textStyle,
            infoStyle,
            infoTextStyle,
            infoContainerStyle,
            deleteContainerStyle,
            buttonContainerStyle,
            metaStyle,
        } = styles;

        const likeHandler = this.likeHandler;

        return (
            <View style={containerStyle}>
                <Text style={textStyle}>{this.props.text}</Text>
                    <View style={metaStyle}>
                        <View style={infoContainerStyle}>
                            <View style={deleteContainerStyle}>
                                {this.renderDeleteButton()}
                            </View>
                            <View style={infoStyle}>
                                <Text style={infoTextStyle}>
                                    <Text>sagt </Text>
                                    <Text style={{ fontWeight: 'bold' }}>{this.props.user.user_name}</Text>
                                    <Text> am </Text>
                                    <Text style={{ fontWeight: 'bold' }}>{this.props.time}</Text>
                                </Text>
                            </View>
                            <View style={buttonContainerStyle}>
                                <LikeButtonGeneric
                                    hash={'test'}
                                    // hash={hash}
                                    size={20}
                                    like={this.state.like}
                                    likeHandler={likeHandler.bind(this)}
                                    addLike={apiUtils.addLikeComment.bind(this)}
                                    substractLike={apiUtils.substractLikeComment.bind(this)}
                                />
                            </View>
                        </View>
                     </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        borderRadius: 15,
        // borderColor: 'black',
        // borderWidth: 1,
        // backgroundColor: Colors.tabIconDefault,
        // backgroundColor: Colors.containerColor,
        backgroundColor: '#fff',
        opacity: 0.6,
        // margin: 5,
        marginBottom: 5,

        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 5,
        // elevation: 5
    },
    textStyle: {
        fontSize: 14,
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
    },
    metaStyle: {
        flexDirection: 'row',
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    infoContainerStyle: {
        flexDirection: 'row',
        width: '100%',
    },
    infoStyle: {
        flex: 13,
    },
    infoTextStyle: {
        fontSize: 12,
        alignSelf: 'flex-end',
        marginRight: 5,
    },
    deleteContainerStyle: {
        flex: 2,
    },
    buttonContainerStyle: {
        flex: 2,
    },
};

// Make the compoent available to other parts of the app
export { Comment };
