import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, DrawerLayoutAndroid, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScrollableList from 'react-native-scrollable-list';

import Route from '../Navigation/route';
import ControlPanel from '../Navigation/control-panel';
import GroceryListRecipeItem from './grocery-list-item-recipe';
import {recipeRouteMaker} from '../Recipe/recipe-container';

import {colors, dims} from '../../styles/global-styles';

let groceryListContext, drawerHandlerPtr, toggleViewPtr;

class GroceryListContainer extends Component {
    constructor(props) {
        super(props);

        groceryListContext = this;
        toggleViewPtr = this._toggleView;
        drawerHandlerPtr = this._handleDrawer;

        this.state = {
            view: 'recipe',
            recipes: [],
        };
        // TODO Set state from localStorage + props?
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

    _toggleView() {
        this.setState({
            view: this.state.view === 'recipe' ? 'ingredient' : 'recipe',
        })
    }

    _makeGroceryList(items) {

    }

    _setInitialValues() {
        let currentList = {};

        AsyncStorage.getItem('groceryList')
            .then((value) => {
                currentList = value;
            }).done();

        AsyncStorage.setItem()
    }

    _navigateToRecipe(recipe) {
        this.props.navigator.push(
            recipeRouteMaker(recipe)
        )
    }

    _removeRecipe(recipe) {
        let updatedRecipes = this.state.recipes.slice();
        let index = this._findElement(updatedRecipes, 'name', recipe.name);
        if (index > -1) {
            updatedRecipes.splice(index, 1);
        }

        this.setState({
            recipes: updatedRecipes
        });
    }

    _decrease(recipe, callerUpdate) {
        let updatedRecipes = this.state.recipes.slice();
        let index = this._findElement(updatedRecipes, 'name', recipe.name);

        if (index > -1) {
            if (updatedRecipes[index].num == 1) {
                this._removeRecipe(recipe);
            } else {
                updatedRecipes[index].num = updatedRecipes[index].num - 1;

                callerUpdate(updatedRecipes[index].num);

                this.setState({
                    recipes: updatedRecipes
                });
            }
        }
    }

    _increase(recipe, callerUpdate) {
        let updatedRecipes = this.state.recipes.slice();
        let index = this._findElement(updatedRecipes, 'name', recipe.name);
        if (index > -1) {
            updatedRecipes[index].num = updatedRecipes[index].num + 1;
        }

        callerUpdate(updatedRecipes[index].num);

        this.setState({
            recipes: updatedRecipes
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
        return (
            this.state.view === 'recipe' ?
                <DrawerLayoutAndroid
                    ref={'DRAWER_REF'}
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => <ControlPanel user={this.props.user}
                                                              navigator={this.props.navigator}/>}>
                    <View style={{marginTop: dims.height * 0.1}}/>
                    <View style={styles.body}>
                        <Text style={styles.headline}>Recipes</Text>

                        <ScrollableList data={this.state.recipes}
                                        enableEmptySections={true}
                                        renderRow={(data) => <GroceryListRecipeItem recipe={data}
                                                                                    num={data.num}
                                                                                    increase={this._increase.bind(this)}
                                                                                    decrease={this._decrease.bind(this)}
                                                                                    removeRecipe={this._removeRecipe.bind(this)}
                                                                                    navigateTo={this._navigateToRecipe.bind(this)}/>}
                        />
                    </View>
                </DrawerLayoutAndroid>
                :
                <DrawerLayoutAndroid
                    ref={'DRAWER_REF'}
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => <ControlPanel user={this.props.user}
                                                              navigator={this.props.navigator}/>}>
                    <View style={{marginTop: dims.height * 0.1}}/>
                    <View style={styles.body}>
                        <Text style={styles.headline}>Ingredients</Text>
                    </View>
                </DrawerLayoutAndroid>
        )
    }
}

function leftButtonFunc(route, navigator, index, navState) {
    return (
        <TouchableHighlight
            underlayColor='transparent'
            style={styles.button}
            onPress={drawerHandlerPtr.bind(groceryListContext)}>
            <Icon name='bars' size={30} color={colors.parchmentLight} style={{margin: 0, padding: 0}}/>
        </TouchableHighlight>
    )
}

function rightButtonFunc(route, navigator, index, navState) {
    return (
        <TouchableHighlight
            underlayColor='transparent'
            style={styles.button}
            onPress={toggleViewPtr.bind(groceryListContext)}>
            <Icon name='reply' size={30} color={colors.parchmentLight}/>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0
    },
    body: {
        paddingTop: dims.height * 0.025,
        paddingLeft: dims.width * 0.05,
        paddingRight: dims.width * 0.05,
    },
    headline: {
        fontSize: 23,
        color: colors.leather,
    }
});

let createGroceryListRoute = function (props) {
    return new Route(4, 'Grocery List', 'grocery-list',
        <GroceryListContainer {...props} />, leftButtonFunc, rightButtonFunc);
};

export default GroceryListContainer;
export {createGroceryListRoute};
