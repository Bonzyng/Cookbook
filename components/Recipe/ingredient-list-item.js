import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, TextInput} from 'react-native';

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
                <TextInput style={styles.textInput}
                           onChangeText={(name) => this.setState({name})}
                           value={this.state.name}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: colors.parchmentLight,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        padding: dims.height * 0.01,
        margin: 0
    }
});

export default IngredientListItem;