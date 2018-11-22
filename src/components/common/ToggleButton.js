// Import a library to help create a component
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

// Make a component
class ToggleButton extends React.Component {
    state = {
        toggled: this.props.toggled,
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
          this.setState({
            toggled: nextProps.toggled
          });
        }
      }

    togglePress = () => {
        this.setState({
            toggled: !this.state.toggled
        });
        this.props.toggleSomething(this.props.someArg);
        }

    renderToggleState(iconStyle) {
        if (this.state.toggled == true) {
            return (
                <Icon
                    name='ios-heart'
                    name={this.props.toggledIcon}
                    size={parseInt(this.props.size) || 45}
                    type='ionicon'
                    style={iconStyle}
                    color={(this.props.toggledColor) || 'grey'}
                />
            );
        }
        return (
            <Icon
                name={this.props.noToggledIcon}
                size={parseInt(this.props.size) || 45}
                type='ionicon'
                style={iconStyle}
                color={(this.props.noToggledColor) || 'grey'}
            />
        );
    }

    render() {
        const {
            containerStyle,
            iconStyle,
        } = styles;
        return (
            <TouchableOpacity onPress={this.togglePress} style={containerStyle}>
                {this.renderToggleState(iconStyle)}
            </TouchableOpacity>
        );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    // iconStyle: {
    //     alignSelf: 'center',
    // },
};

// Make the compoent available to other parts of the app
export { ToggleButton };
