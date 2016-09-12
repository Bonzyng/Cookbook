import React, {Component} from 'react';
import {View, AsyncStorage, Text, Modal, StyleSheet} from 'react-native';
import ScrollableList from 'react-native-scrollable-list';
import Events from 'react-native-simple-events';

import RecipeListItem from './recipe-list-item';
import Button from '../Button/button';
import auth from '../../stores/auth';
import {colors, dims} from '../../styles/global-styles';
import {createRecipeRoute} from '../Recipe/recipe-container';
import {createGroceryListRoute} from '../GroceryList/grocery-list-container';

const listenerId = 'RecipeListListener';

const helperRecipes = [
    {
        name: 'tewo',
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
        num: 3,
    },
    {
        name: 'Steak',
        category: 'Meat',
        servings: 2,
        time: 30,
        difficulty: 'Medium',
        id: 2,
        num: 2,
    },
    {
        name: 'Ice Cream',
        category: 'Dessert',
        servings: 3,
        time: 5,
        difficulty: 'Medium',
        id: 3,
        num: 1,
    },
];

class RecipeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            modalVisible: false,
        };

        this.rows = [];

        this._getRecipes = this._getRecipes.bind(this);
    }

    componentDidMount() {
        this._getRecipes();

        if (!this.rows) {
            this.rows = [];
        }

        Events.on('RECIPES_UPDATE', listenerId, this._getRecipes);
    }

    componentWillUnmount() {
        Events.rm('RECIPES_UPDATE', listenerId);
    }

    _navigateToRecipe(recipe) {
        this.props.navigator.push(
            createRecipeRoute(recipe)
        )
    }

    _getRecipes() {
        AsyncStorage.getItem(auth.getUserUid() + '/recipes')
            .then((value) => {
                this.setState({
                    recipes: JSON.parse(value)
                });
            })
            .catch(() => {
                this.setState({
                    recipes: []
                });
            }).done();
    }

    fetchGroceryList() {
        let recipes = [];
        if (this.rows) {
            this.rows.forEach((e) => {
                let data = e.fetchData();
                if (data.num) {
                    recipes.push(data);
                }
            })
        }

        if (recipes.length > 0) {
            AsyncStorage.getItem(auth.getUserUid() + '/grocery_list/recipes')
                .then((value) => {
                    let arr = JSON.parse(value);

                    let updatedList = [];

                    arr.forEach((e) => {
                        let shared = false;
                        for (let i = 0; i < recipes.length && !shared; i++) {
                            shared = e.name === recipes[i].name;
                        }

                        if (!shared) updatedList.push(e);
                    });

                    updatedList = updatedList.concat(recipes);

                    AsyncStorage.setItem(auth.getUserUid() + '/grocery_list/recipes', JSON.stringify(updatedList))
                        .then(() => {
                            Events.trigger('GROCERY_LIST_UPDATE');
                            this.props.navigator.push(createGroceryListRoute())
                        })
                        .done();
                })
                .catch(() => {
                    AsyncStorage.setItem(auth.getUserUid() + '/grocery_list/recipes', JSON.stringify(recipes))
                        .then(() => {
                            Events.trigger('GROCERY_LIST_UPDATE');
                            this.props.navigator.push(createGroceryListRoute())
                        })
                        .done();
                }).done();
        } else {
            this._setModalVisible(true)
        }
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    // TODO use renderSeparator and height: StyleSheet.hairlineWidth. See https://medium.com/@spencer_carli/react-native-basics-how-to-use-the-listview-component-a0ec44cf1fe8#.8qrpnww2h
    render() {
        return (
            <View>
                <ScrollableList style={{backgroundColor: colors.parchmentLight}} data={this.state.recipes}
                                enableEmptySections={true}
                                renderRow={(data, section, index) => <RecipeListItem recipe={data}
                                                                                     ref={(row) => this.rows[index] = row}
                                                                                     navigateTo={this._navigateToRecipe.bind(this)}/>}/>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this._setModalVisible(false)
                    }}>
                    <View style={[styles.container, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
                        <View style={[styles.innerContainer, {backgroundColor: colors.parchmentLight, padding: 20}]}>
                            <Text style={styles.alertText}>No recipes selected!</Text>

                            <Button
                                onPress={this._setModalVisible.bind(this, false)}
                                style={styles.modalButton}>
                                OK
                            </Button>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: colors.parchmentLight,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: dims.width * 0.2,
    },
    modalButton: {
        marginTop: dims.height * 0.06,
    },
    innerContainer: {
        borderRadius: dims.width * 0.1,
        alignItems: 'center',
    },
    alertText: {
        fontSize: 18,
        marginTop: dims.height * 0.03,
    }
});

export default RecipeList;
