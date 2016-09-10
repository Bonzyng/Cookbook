import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, DrawerLayoutAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScrollableList from 'react-native-scrollable-list';

import Route from '../Navigation/route';
import ControlPanel from '../Navigation/control-panel';
import GroceryListRecipeItem from './grocery-list-item-recipe';

import {colors, dims} from '../../styles/global-styles';

// TODO Remove when switching to remote data fetching
const recipes = [
    {
        name: 'Lettuce Salad',
        category: 'Salad',
        servings: 4,
        time: 15,
        difficulty: 'Medium',
        ingredientsArray: [
            {
                unit: 'Kg',
                amount: '1',
                name: 'Lettuce'
            },
            {
                unit: 'Gram',
                amount: '20',
                name: 'Salt'
            }
        ],
        instructions: 'cut lettuce\nput in bowl\nadd salt\neat!',
        id: 1,
        num: 2,
    },
    {
        name: 'Steak',
        category: 'Meat',
        servings: 2,
        time: 30,
        difficulty: 'Medium',
        id: 2,
        num: 1,
    },
    {
        name: 'Ice Cream',
        category: 'Dessert',
        servings: 3,
        time: 5,
        difficulty: 'Medium',
        id: 3,
        num: 4,
    },
];

let groceryListContext, toggleViewPtr;

class GroceryListContainer extends Component {
    constructor(props) {
        super(props);

        groceryListContext = this;
        toggleViewPtr = this._toggleView;

        this.state = {
            view: 'recipe',
            recipes: recipes,
        };
        // TODO Set state from localStorage + props?
    }

    _toggleView() {
        this.setState({
            view: this.state.view === 'recipe' ? 'ingredient' : 'recipe',
        })
    }

    _makeGroceryList(items) {

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

    _decrease(recipe) {
        let updatedRecipes = this.state.recipes.slice();
        let index = this._findElement(updatedRecipes, 'name', recipe.name);
        if (index > -1) {
            if (updatedRecipes[index].num == 1) {
                this._removeRecipe(recipe);
            } else {
                updatedRecipes[index].num = updatedRecipes[i].num - 1;
            }
        }

        this.setState({
            recipes: updatedRecipes
        });
    }

    _increase(recipe) {
        let updatedRecipes = this.state.recipes.slice();
        let index = this._findElement(updatedRecipes, 'name', recipe.name);
        if (index > -1) {
            updatedRecipes[index].num = updatedRecipes[i].num + 1;
        }

        this.setState({
            recipes: updatedRecipes
        });
    }

    _findElement(arr, propName, propValue) {
        arr.forEach((v, i) => {
            if (v[propName] === propValue) {
                return i;
            }
        });

        return -1;
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
                        <Text>Ingredients</Text>
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
