import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, TextInput, Picker} from 'react-native';

import {dims, colors} from '../../styles/global-styles';

class IngredientListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            amount: this.props.amount,
            unit: this.props.unit
        }
    }

    render() {
        return (
            <View style={styles.row}>
                <Text style={styles.textInput}>{this.state.amount}</Text>
                <Text style={[styles.textInput, {marginLeft: dims.width * -0.1}]}>{this.state.unit}</Text>
                <Text style={styles.textInput}>{this.state.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: colors.parchmentLight,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginRight: dims.width * 0.1,
        marginLeft: dims.width * 0.1,
    },
    textInput: {
        flex: 1,
        padding: dims.height * 0.01,
        margin: 0
    }
});

export default IngredientListItem;