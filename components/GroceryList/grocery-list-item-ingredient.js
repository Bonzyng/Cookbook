import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import CheckBox from 'react-native-checkbox';

import {colors, dims} from '../../styles/global-styles';

class GroceryListIngredientItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            textDecorationLine: 'none',
        }
    }


    render() {
        return (
            <View style={styles.checkbox}>
                <CheckBox
                    label=""
                    checked={this.state.checked}
                    onChange={() => this.setState({
                        checked: !this.state.checked,
                        textDecorationLine: !this.state.checked ? 'line-through' : 'none'
                    })}
                    underlayColor={colors.parchmentLight}/>
                <Text style={[styles.text, {textDecorationLine: this.state.textDecorationLine, flex: 1}]}>
                    {this.props.name}</Text>
                <Text style={[styles.text, {textDecorationLine: this.state.textDecorationLine, textAlign: 'right', flex: 1, paddingRight: dims.width * 0.05}]}>
                    {this.props.amount} {this.props.unit}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    checkbox: {
        backgroundColor: colors.parchmentLight,
        flexDirection: 'row',
        flex: 1,
        height: dims.height * 0.1,
        borderColor: colors.leather,
        borderBottomWidth: 0.5,
        alignItems: 'center',
        marginTop: 1,
    },
    text: {
        fontSize: 18,
        marginBottom: 5,
    }
});

export default GroceryListIngredientItem;