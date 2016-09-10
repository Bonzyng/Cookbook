import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TouchableHighlight} from 'react-native';

import {dims, colors} from '../../styles/global-styles';

class GroceryListRecipeItem extends Component {

    // TODO Limit text lengths so we don't wrap and exist the item area
    render() {
        return (
            <View style={styles.row}>
                <TouchableHighlight style={styles.button} onPress={() => this.props.decrease(this.props.recipe)}
                                    underlayColor={colors.leatherLight}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableHighlight>
                <Text style={styles.num}>{this.props.num}</Text>
                <TouchableHighlight style={styles.button} onPress={() => this.props.increase(this.props.recipe)}
                                    underlayColor={colors.leatherLight}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigateTo(this.props.recipe)}
                                    underlayColor={colors.leatherLight}>
                    <View style={[styles.data, styles.row]}>
                        <Text style={styles.recipeName}>{this.props.recipe.name}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    row: {
        backgroundColor: colors.parchmentLight,
        flexDirection: 'row',
        flex: 1,
        height: dims.height * 0.1,
        borderColor: colors.leather,
        borderBottomWidth: 0.5,
        alignItems: 'center',
        marginTop: 1,
    },
    data: {
        marginLeft: dims.width * 0.02,
        flexDirection: 'column',
        flex: 1,
    },
    button: {
        margin: dims.height * 0.02,
        backgroundColor: colors.leather,
        height: dims.height * 0.06,
        width: dims.height * 0.06,
        borderRadius: dims.height * 0.03,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    buttonText: {
        fontSize: 23,
        color: colors.parchmentLight
    },
    recipeName: {
        fontSize: 25,
    },
    timeArea: {
        width: dims.width * 0.15,
        flexDirection: 'row',
        margin: dims.height * 0.02,
        justifyContent: 'center',
    },
    minutes: {
        marginLeft: dims.height * 0.005
    },
    time: {
        fontSize: 25,
    },
    num: {
        fontSize: 25,
    }
});

export default GroceryListRecipeItem;