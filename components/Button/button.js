import React, {Component} from 'react';
import {
    TouchableHighlight,
    StyleSheet,
    Text,
} from 'react-native';

import {dims, colors} from './../../styles/global-styles';

class Button extends Component {
    state = {
        active: false,
    };

    _onHighlight = () => {
        this.setState({active: true});
    };

    _onUnhighlight = () => {
        this.setState({active: false});
    };

    render() {
        var colorStyle = {
            color: this.state.active ? '#fff' : '#000',
        };
        return (
            <TouchableHighlight
                onHideUnderlay={this._onUnhighlight}
                onPress={this.props.onPress}
                onShowUnderlay={this._onHighlight}
                style={[styles.button, this.props.style]}
                underlayColor={colors.leatherLight}>
                <Text style={[styles.buttonText]}>{this.props.children}</Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: dims.width * 0.1,
        padding: dims.height * 0.02,
        paddingRight: dims.width * 0.1,
        paddingLeft: dims.width * 0.1,
        alignSelf: 'auto',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: colors.leather,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        color: colors.parchmentLight,
        textAlign: 'center',
    }
});

export default Button;