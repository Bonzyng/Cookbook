import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {dims, colors} from '../../styles/global-styles';

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            num: 0
        };
    }

    _toggleSelect() {
        this.setState({
            selected: !this.state.selected
        })
    }

    _decrease() {
        if (this.state.num == 1) {
            this._toggleSelect();
        } else {
            this.setState({
                num: this.state.num - 1
            })
        }
    }

    _increase() {
        this.setState({
            num: this.state.num + 1
        })
    }

    render() {
        return (
            this.state.selected ?
                <View style={styles.row}>
                    <TouchableHighlight style={styles.button} onPress={this._decrease.bind(this)}>
                        <Text style={{fontSize: 23}}>-</Text>
                    </TouchableHighlight>
                    <Text>{this.state.num}</Text>
                    <TouchableHighlight style={styles.button} onPress={this._increase.bind(this)}>
                        <Text style={{fontSize: 23}}>+</Text>
                    </TouchableHighlight>
                </View>
                :
                <View style={styles.row}>
                    <TouchableHighlight style={styles.button} onPress={this._toggleSelect.bind(this)}>
                        <Text style={{fontSize: 23}}>{this.props.name.charAt(0)}</Text>
                    </TouchableHighlight>
                    <View style={styles.data}>
                        <Text style={styles.recipeName}>{this.props.name}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1, alignItems: 'flex-start'}}>
                                <Text>Category: {this.props.category}</Text>
                            </View>
                            <View style={{flex: 1, alignItems: 'flex-end'}}>
                                <Text>Servings: {this.props.servings}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.timeArea}>
                        <Text style={styles.time}>{this.props.time}</Text>
                        <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                            <Text style={styles.minutes}>min.</Text>
                        </View>
                    </View>
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
    }
});

export default ListItem;