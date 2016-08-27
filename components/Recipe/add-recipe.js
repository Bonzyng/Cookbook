import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    DrawerLayoutAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';

import Route from '../Navigation/route';
import ControlPanel from '../Navigation/control-panel';
import {colors, dims, colorsRgba} from '../../styles/global-styles';

let drawerHandlerPtr, cookbookContext;

class RecipeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
        cookbookContext = this;
    }

    _handleDrawer() {
        if (this.state.drawerOpen) {
            this.setState({drawerOpen: false});
            this.refs['DRAWER_REF'].openDrawer();
        } else {
            this.setState({drawerOpen: true});
            this.refs['DRAWER_REF'].closeDrawer();
        }
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: colors.parchmentLight, height: dims.height, flex: 1}}>
                <View style={{marginTop: dims.height * 0.1}}/>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'center'}}>Hello</Text>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'center'}}>World!</Text>
            </ScrollView>
        )
    }
}

function leftButtonFunc(route, navigator, index, navState) {
    return <TouchableHighlight
        underlayColor='transparent'
        style={styles.button}
        onPress={drawerHandlerPtr.bind(cookbookContext)}>
        <Icon name='bars' size={30} color={colors.parchmentLight} style={{margin: 0, padding: 0}}/>
    </TouchableHighlight>;
}
function rightButtonFunc(route, navigator, index, navState) {
    return <Icon name='plus' size={25} color={colors.parchmentLight}/>
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0
    }
});

let AddRecipeRoute = new Route(1, 'Add Recipe', 'add-recipe', <RecipeContainer />, leftButtonFunc, rightButtonFunc);
export {AddRecipeRoute};