import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../../stores/api';
import {colors} from '../../styles/global-styles';
import {CookbookRoute} from '../Cookbook/cookbook-container';
import {createGroceryListRoute} from '../GroceryList/grocery-list-container';

class ControlPanel extends Component {
    constructor(props) {
        super(props);
    }

    _navToCookbook() {
        // alert(JSON.stringify(this.props.navigator.getCurrentRoutes(), null, 4));
        this.props.navigator.popToRoute(CookbookRoute)
    }

    _navToGroceryList() {
        let routes = this.props.navigator.getCurrentRoutes();
        routes.some(this._checkHasGroceryListRouteId) ?
            this.props.navigator.jumpTo(createGroceryListRoute()) :
            this.props.navigator.push(createGroceryListRoute());
    }

    _checkHasGroceryListRouteId(route) {
        return route['_index'] === 4;
    }

    render() {
        return (
            <ScrollView style={styles.controlPanel}>
                <TouchableHighlight
                    underlayColor='transparent'
                    onPress={()=> {
                        this._navToCookbook()
                    }}>
                    <View style={styles.row}>
                        <Icon style={styles.controlPanelIcon} name="book" size={30} color="black"/>
                        <Text style={styles.controlPanelText}>Cookbook</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor='transparent'
                    onPress={()=> {
                        this._navToGroceryList()
                    }}>
                    <View style={styles.row}>
                        <Icon style={styles.controlPanelIcon} name="check-square-o" size={30} color="black"/>
                        <Text style={styles.controlPanelText}>Grocery List</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor='transparent'
                    onPress={()=> {
                        api.auth.signOut()
                    }}>
                    <View style={styles.row}>
                        <Icon style={styles.controlPanelIcon} name="sign-out" size={30} color="black"/>
                        <Text style={styles.controlPanelText}>Sign Out</Text>
                    </View>
                </TouchableHighlight>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    controlPanel: {
        marginTop: 60,
        width: 300,
        flex: 1,
        // justifyContent:'flex-end',
        backgroundColor: colors.parchmentLight
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.3)',
        height: 65
    },
    controlPanelIcon: {
        marginTop: 15,
        marginLeft: 10,
        lineHeight: 10
    },
    controlPanelText: {
        color: 'rgba(0,0,0,0.9)',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 0, 1)',
        fontWeight: 'bold'
    }
});

export default ControlPanel;