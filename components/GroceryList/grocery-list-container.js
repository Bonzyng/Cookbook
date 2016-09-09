import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, DrawerLayoutAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Route from '../Navigation/route';
import ControlPanel from '../Navigation/control-panel';

import {colors, dims} from '../../styles/global-styles';

class GroceryListContainer extends Component {
    render() {
        return (
            <DrawerLayoutAndroid
                ref={'DRAWER_REF'}
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => <ControlPanel user={this.props.user} navigator={this.props.navigator} />}>
                <View style={{marginTop: dims.height * 0.1}}/>
                <Text>Grocery List</Text>
            </DrawerLayoutAndroid>
        )
    }
}

function leftButtonFunc(route, navigator, index, navState) {
    return (
        <TouchableHighlight
            underlayColor='transparent'
            style={styles.button}
            onPress={() => alert('I do nothing')}>
            <Icon name='bars' size={30} color={colors.parchmentLight} style={{margin: 0, padding: 0}}/>
        </TouchableHighlight>
    )
}

function rightButtonFunc(route, navigator, index, navState) {
    return (
        <TouchableHighlight
            underlayColor='transparent'
            style={styles.button}
            onPress={() => alert('I do nothing')}>
            <Icon name='plus' size={30} color={colors.parchmentLight}/>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0
    }
});

let GroceryListRoute = new Route(4, 'Grocery List', 'grocery-list', <GroceryListContainer />, leftButtonFunc, rightButtonFunc);

export default GroceryListContainer;
export {GroceryListRoute};
