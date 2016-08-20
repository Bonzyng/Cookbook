import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../../stores/api';
import {colors} from '../../styles/global-styles';

class ControlPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={styles.controlPanel}>
                <TouchableHighlight underlayColor='transparent' onPress={()=>{alert('pets menu!')}}>
                    <View style={styles.row}>
                        <Icon style={styles.controlPanelIcon} name="paw" size={30} color="black"/>
                        <Text style={styles.controlPanelText}>Pets Menu</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={()=>{alert('settings!')}}>
                    <View style={styles.row}>
                        <Icon style={styles.controlPanelIcon} name="cogs" size={30} color="black"/>
                        <Text style={styles.controlPanelText}>Settings</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={()=>{api.auth.signOut()}}>
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