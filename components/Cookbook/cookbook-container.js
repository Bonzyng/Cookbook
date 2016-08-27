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

import {AddRecipeRoute} from '../Recipe/add-recipe-container';
import Route from '../Navigation/route';
import ControlPanel from '../Navigation/control-panel';
import RecipeList from './recipe-list';
import {colors, dims} from '../../styles/global-styles';

let drawerHandlerPtr, cookbookContext;

class CookbookContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
        drawerHandlerPtr = this._handleDrawer;
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
            <DrawerLayoutAndroid
                ref={'DRAWER_REF'}
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => <ControlPanel user={this.props.user} />}>
                <View style={{marginTop: dims.height * 0.1}}/>
                <RecipeList navigator={this.props.navigator}/>
                <ActionButton
                    buttonColor={colors.leather}
                    icon={<Icon name='plus' size={25} color={colors.parchmentLight}/>}
                    onPress={() => {this.props.navigator.push(AddRecipeRoute)}}
                />
            </DrawerLayoutAndroid>
        )
    }
}

function leftButtonFunc(route, navigator, index, navState) {
    return (
        <TouchableHighlight
            underlayColor='transparent'
            style={styles.button}
            onPress={drawerHandlerPtr.bind(cookbookContext)}>
            <Icon name='bars' size={30} color={colors.parchmentLight} style={{margin: 0, padding: 0}}/>
        </TouchableHighlight>
    )
}
function rightButtonFunc(route, navigator, index, navState) {
    return <Icon name='plus' size={30} color={colors.parchmentLight}/>
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0
    }
});

let CookbookRoute = new Route(0, 'Cookbook', 'cookbook', <CookbookContainer />, leftButtonFunc, rightButtonFunc);
export {CookbookRoute};

export default CookbookContainer; // TODO Remove this