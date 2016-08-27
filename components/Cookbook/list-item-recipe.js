import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {dims} from '../../styles/global-styles';

class ListItem extends Component {
    render() {
        return (
            <View style={styles.row}>
                <View style={styles.name}>
                    <Text>{this.props.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text>{this.props.category}</Text>
                        <Text>{this.props.servings}</Text>
                    </View>
                </View>
                <Text>{this.props.time}</Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    row: {
        backgroundColor: '#81c04d',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',    //Step 1
        height: dims.height * 0.2
    },
    name: {
        flexDirection: 'column'
    }
});

export default ListItem;