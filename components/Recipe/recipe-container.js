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

import Route from '../Navigation/route';
import {colors, dims} from '../../styles/global-styles';

let drawerHandlerPtr, cookbookContext;

class RecipeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
        drawerHandlerPtr = this._handleDrawer;
        cookbookContext = this;
    }

    render() {
        return (
            <Text>Here be a recipe</Text>
        )
    }
}

function leftButtonFunc(route, navigator, index, navState) {
    return <Icon name='bars' size={30} color={colors.parchmentLight}/>
}
function rightButtonFunc(route, navigator, index, navState) {
    return <Icon name='plus' size={30} color={colors.parchmentLight}/>
}

let RecipeRoute = new Route(0, 'Recipe', 'recipe', <RecipeContainer />, leftButtonFunc, rightButtonFunc);
export {RecipeRoute};