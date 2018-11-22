// Import a library to help create a component
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import apiUtils from '../../api/apiUtils';


// Make a component
class LikeButton extends React.Component {
    state = {
        like: this.props.like,
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
          this.setState({
            like: nextProps.like
          });
        }
      }

      likePress = () => {
        const oldLike = this.props.like;
        const hash = this.props.hash;

        if (oldLike === false) {
            apiUtils.addLike(hash);
        }

        if (oldLike === true) {
            apiUtils.substractLike(hash);
        }
        this.props.likeHandler();
        }

    renderLikeState(iconStyle) {
        if (String(this.state.like) === 'true') {
            return (
                <Icon
                    name='ios-heart'
                    size={45}
                    type='ionicon'
                    style={iconStyle}
                    color='grey'
                />
            );
        }
        return (
            <Icon
                name='ios-heart-empty'
                size={45}
                type='ionicon'
                style={iconStyle}
                color='grey'
            />
        );
    }

    render() {
        const {
            containerStyle,
            iconStyle,
        } = styles;
        return (
            <TouchableOpacity onPress={this.likePress} style={containerStyle}>
                {this.renderLikeState(iconStyle)}
            </TouchableOpacity>
        );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginRight: 15,
    },
    // iconStyle: {
    //     alignSelf: 'center',
    // },
};

// Make the compoent available to other parts of the app
export { LikeButton };
