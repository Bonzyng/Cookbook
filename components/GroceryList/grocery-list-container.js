import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, DrawerLayoutAndroid, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScrollableList from 'react-native-scrollable-list';

import Route from '../Navigation/route';
import ControlPanel from '../Navigation/control-panel';
import GroceryListRecipeItem from './grocery-list-item-recipe';
import GroceryListIngredientItem from './grocery-list-item-ingredient';
import IngredientUnits from '../Recipe/ingredient-units';
import auth from '../../stores/auth';
import {createRecipeRoute} from '../Recipe/recipe-container';

import {colors, dims} from '../../styles/global-styles';

let groceryListContext, drawerHandlerPtr, toggleViewPtr;

const views = {
    recipe: 1,
    ingredient: 2,
};

class GroceryListContainer extends Component {
    constructor(props) {
        super(props);

        groceryListContext = this;
        toggleViewPtr = this._toggleView;
        drawerHandlerPtr = this._handleDrawer;

        this.state = {
            view: views.recipe,
            recipes: [],
            ingredients: {},
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

    _toggleView() {
        if (this.state.view === views.recipe) {
            this._extrapolateIngredients();
        } else if (this.state.view === views.ingredient) {
            this._setIngredients();
        }

        this.setState({
            view: this.state.view === views.recipe ? views.ingredient : views.recipe,
        });
    }

    componentDidMount() {
        AsyncStorage.getItem(auth.getUserUid() + '/grocery_list/recipes')
            .then((value) => {
                this.setState({
                    recipes: JSON.parse(value)
                });
            })
            .catch(() => {
                // TODO Show some empty meme? :o
            })
            .done();
    }

    componentWillUnmount() {
        AsyncStorage.setItem(auth.getUserUid() + '/grocery_list/recipes', JSON.stringify(this.state.recipes))
            .then().done();
    }

    _navigateToRecipe(recipe) {
        this.props.navigator.push(
            createRecipeRoute(recipe)
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

    _toggleChecked(ingredient, callerUpdate) {
        let ingredients = this.state.ingredients;
        if (this.state.ingredients.hasOwnProperty(ingredient)) {
            ingredients[ingredient].checked = !ingredients[ingredient].checked;

            callerUpdate(ingredients[ingredient].checked);

            this.setState({
                ingredients
            });
        }
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

    _getIngredients() {
        let arr = [];
        for (var key in this.state.ingredients) {
            if (this.state.ingredients.hasOwnProperty(key)) {
                arr.push({
                    name: key,
                    unit: this.state.ingredients[key].unit,
                    amount: this.state.ingredients[key].amount,
                    checked: this.state.ingredients[key].checked,
                })
            }
        }

        return arr;
    }

    _extrapolateIngredients() {
        let updatedIngredients = {};
        this.state.recipes.forEach((recipe) => {
            recipe.ingredientsArray.forEach((ingredient) => {
                if (ingredient.name in updatedIngredients) {
                    updatedIngredients[ingredient.name] =
                        this._combineIngredients(ingredient, updatedIngredients[ingredient.name], parseInt(recipe.num));
                } else {
                    updatedIngredients[ingredient.name] = {
                        unit: ingredient.unit,
                        amount: parseInt(ingredient.amount) * parseInt(recipe.num),
                        checked: false,
                    }
                }
            })
        });

        this.setState({
            ingredients: updatedIngredients
        })
    }

    _setIngredients() {

    }

    _combineIngredients(thisIngredient, otherIngredient, multiplier) {
        let res = {
            checked: false,
        };

        if (thisIngredient.unit === otherIngredient.unit) {
            res['unit'] = thisIngredient.unit;
            res['amount'] = parseInt(thisIngredient.amount) * multiplier + parseInt(otherIngredient.amount);
        } else {
            res['unit'] = thisIngredient.unit;

            if (thisIngredient.unit === IngredientUnits.kg && otherIngredient.unit === IngredientUnits.gram) {
                res['amount'] = parseInt(thisIngredient.amount) + this._gramToKg(parseInt(otherIngredient.amount));
            } else if (thisIngredient.unit === IngredientUnits.gram && otherIngredient.unit === IngredientUnits.kg) {
                res['amount'] = parseInt(thisIngredient.amount) + this._kgToGram(parseInt(otherIngredient.amount));
            } else {
                // One is unit and the other is kg/gram, so fuck it let's party
                res['amount'] = thisIngredient.amount * 2;
            }
        }

        return res;
    }

    _gramToKg(num) {
        return num / 1000.0;
    }

    _kgToGram(num) {
        return num * 1000;
    }

    render() {
        return (
            <DrawerLayoutAndroid
                ref={'DRAWER_REF'}
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => <ControlPanel user={this.props.user}
                                                          navigator={this.props.navigator}/>}>
                <View style={{marginTop: dims.height * 0.1}}/>
                <View style={styles.body}>
                    <Text style={styles.headline}>{this.state.view === views.recipe ? 'Recipes' : 'Ingredients'}</Text>

                    <ScrollableList
                        data={this.state.view === views.recipe ? this.state.recipes : this._getIngredients()}
                        enableEmptySections={true}
                        renderRow={(data) =>
                            this.state.view === views.recipe ?
                                <GroceryListRecipeItem recipe={data}
                                                       num={data.num}
                                                       increase={this._increase.bind(this)}
                                                       decrease={this._decrease.bind(this)}
                                                       removeRecipe={this._removeRecipe.bind(this)}
                                                       navigateTo={this._navigateToRecipe.bind(this)}/>
                                :
                                <GroceryListIngredientItem {...data} toggleChecked={this._toggleChecked.bind(this)}/>}
                    />
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
