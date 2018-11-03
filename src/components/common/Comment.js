// Import a library to help create a component
import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';

import apiUtils from '../../api/apiUtils';

import { LikeButtonGeneric, IconButton } from '.';

import Colors from '../../constants/Colors';

// Make a component
class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.likeHandler = this.likeHandler.bind(this);
      }

    state = {
        like: false,
    }

    async componentDidMount() {
        await this.loadLikeState();
    }

    onDelete() {
        console.log('Delete!!!!');
    }

    async loadLikeState() {
        const id = '3';
        // const id = String(this.props.comment.id);
        let likeState = await AsyncStorage.getItem('comment_'.concat(id));

        if (likeState === null) {
          likeState = false;
        }

        this.setState({
            like: likeState
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
        //TODO Hier muss der richtige User Parameter gecallt werden mit vorhandener Funktion
        const userhash = '123';
        if (this.props.user.userhash === userhash) {
            //TODO: Hier Comment Delete Funktion einfügen
            return (
                <IconButton 
                    onPress={this.onDelete}
                    name='close'
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
                                    <Text style={{ fontWeight: 'bold' }}>{this.props.user.username}</Text>
                                    <Text> am </Text>
                                    <Text style={{ fontWeight: 'bold' }}>{this.props.date}</Text>
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
        borderColor: 'black',
        borderWidth: 1,
        // backgroundColor: Colors.tabIconDefault,
        margin: 5,
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
    },
    metaStyle: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    infoContainerStyle: {
        flexDirection: 'row',
        width: '100%',
        marginLeft: 5,
        marginRight: 5,
    },
    infoStyle: {
        flex: 8,
    },
    infoTextStyle: {
        fontSize: 12,
        alignSelf: 'flex-end'
    },
    deleteContainerStyle: {
        flex: 1,
    },
    buttonContainerStyle: {
        flex: 2,
    },
};

// Make the compoent available to other parts of the app
export { Comment };
