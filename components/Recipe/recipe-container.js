import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    DrawerLayoutAndroid,
    AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogBox from 'react-native-dialogbox';
import Events from 'react-native-simple-events';

import ControlPanel from '../Navigation/control-panel';
import Route from '../Navigation/route';
import IngredientListItem from './ingredient-list-item';
import auth from '../../stores/auth';

import {colors, dims} from '../../styles/global-styles';

let recipeContext, drawerHandlerPtr, deleteRecipePtr;

class RecipeContainer extends Component {
    constructor(props) {
        super(props);

        drawerHandlerPtr = this._handleDrawer;
        deleteRecipePtr = this._deleteRecipe;
        recipeContext = this;

        this.state = {
            drawerOpen: false
        };
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

    _deleteRecipe() {
        this.dialogbox.confirm({
            content: 'Delete recipe?',
            ok: {
                text: 'Yes',
                callback: () => {
                    AsyncStorage.getItem(auth.getUserUid() + '/recipes')
                        .then((value) => {
                            let arr = JSON.parse(value);

                            // Find and remove element from array
                            let index = this._findElement(arr, 'name', this.props.name);
                            if (index > -1) {
                                arr.splice(index, 1);
                            }

                            AsyncStorage.setItem(auth.getUserUid() + '/recipes', JSON.stringify(arr))
                                .then(Events.trigger('RECIPES_UPDATE'))
                                .done();
                        })
                        .catch(() => {
                            // AsyncStorage.setItem(auth.getUserUid() + '/recipes', JSON.stringify([]))
                            //     .then(Events.trigger('RECIPES_UPDATE'))
                            //     .done();
                        }).done();

                    this.props.navigator.pop();
                }
            },
            cancel: {
                text: 'No'
            }
        });
    }

    _findElement(arr, propName, propValue) {
        let val = -1;
        arr.forEach((v, i) => {
            if (v[propName] === propValue) {
                val = i;
            }
        });

        return val;
    }

    render() {
        let ingredients = this.props.ingredientsArray ?
            this.props.ingredientsArray.map((data, i) => {
                return <View key={i}><IngredientListItem {...data} /></View>
            }) : [];

        return (
            <DrawerLayoutAndroid
                ref={'DRAWER_REF'}
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => <ControlPanel user={this.props.user} navigator={this.props.navigator}/>}>
                <View style={{marginTop: dims.height * 0.1}}/>
                <ScrollView style={styles.body}>
                    <Text style={[styles.text, {flex: 1, margin: 10}]}>{this.props.name}</Text>
                    <Text style={styles.smallText}>Preperation Time: {this.props.time} minutes</Text>
                    <Text style={styles.smallText}>Difficulty: {this.props.difficulty}</Text>
                    <Text style={styles.smallText}>Servings: {this.props.servings}</Text>
                    <Text style={styles.smallText}>Ingredients List:</Text>
                    {ingredients}
                    <Text style={styles.smallText}>Instructions:</Text>
                    <Text style={styles.smallText}>{this.props.instructions}</Text>
                </ScrollView>

                <DialogBox ref={(dialogbox) => {
                    this.dialogbox = dialogbox
                }}/>
            </DrawerLayoutAndroid>
        )
    }
}

function leftButtonFunc(route, navigator, index, navState) {
    return (
        <TouchableHighlight
            underlayColor='transparent'
            style={styles.navButton}
            onPress={drawerHandlerPtr.bind(recipeContext)}>
            <Icon name='bars' size={30} color={colors.parchmentLight} style={{margin: 0, padding: 0}}/>
        </TouchableHighlight>
    )
}
function rightButtonFunc(route, navigator, index, navState) {
    return (
        <TouchableHighlight
            underlayColor='transparent'
            style={styles.navButton}
            onPress={deleteRecipePtr.bind(recipeContext)}>
            <Icon name='remove' size={30} color={colors.parchmentLight} style={{margin: 0, padding: 0}}/>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: colors.parchmentLight,
        height: dims.height,
        flex: 1,
        paddingLeft: dims.width * 0.05,
        paddingRight: dims.width * 0.05
    },
    text: {
        fontSize: 20
    },
    smallText: {
        fontSize: 18,
        marginTop: 10,
    },
    navBarButton: {
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0
    },
    navButton: {
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0
    },
    button: {
        marginTop: dims.height * 0.01,
        marginBottom: dims.height * 0.01,
        marginRight: dims.height * 0.005,
        marginLeft: dims.height * 0.005,
        backgroundColor: colors.leather,
        height: dims.height * 0.06,
        width: dims.height * 0.06,
        borderRadius: dims.height * 0.03,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    row: {
        backgroundColor: colors.parchmentLight,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        minHeight: dims.height * 0.085
    },
    column: {
        flexDirection: 'column'
    },
    textInput: {
        flex: 1,
        padding: dims.height * 0.01,
        margin: 0
    },
    buttonText: {
        fontSize: 15,
        color: colors.parchmentLight
    }
});

let recipeRouteMaker = function (props) {
    return new Route(3, 'Recipe', 'recipe', <RecipeContainer {...props} />, leftButtonFunc, rightButtonFunc);
};

export {recipeRouteMaker};