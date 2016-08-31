import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    Picker,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Route from '../Navigation/route';
import IngredientListItem from './ingredient-list-item';
import AddIngredient from './add-ingredient';
import {colors, dims} from '../../styles/global-styles';

// TODO Remove. Moved to ingredient-list-item
const ingredientUnits = {
    kg: 'Kg',
    gram: 'Grams',
    unit: 'Units'
}

// TODO Remove
const fakeIngredients = [
    {name: 'Tomato', amount: 1, unit: ingredientUnits.kg},
    {name: 'Pasta', amount: 500, unit: ingredientUnits.gram},
    {name: 'Salt', amount: 10, unit: ingredientUnits.gram},
    {name: 'Salt', amount: 10, unit: ingredientUnits.gram},
    {name: 'Egg', amount: 2, unit: ingredientUnits.unit}
];

const difficulties = {
    hard: 'Hard',
    medium: 'Medium',
    easy: 'Easy'
};

class AddRecipeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            prepTime: 0,
            difficulty: difficulties.medium,
            servings: 0,
            tags: {},
            instructions: '',
            ingredientsArray: fakeIngredients,
        }
    }

    _addIngredient(ingredient) {
        this.setState({
            ingredientsArray: [...this.state.ingredientsArray, ingredient]
        });
    }

    _addRecipe() {
        alert('Adding recipe!\nName: ' + this.state.name + '\nPrep time: ' + this.state.prepTime);
    }

    _increase5() {
        this.setState({
            prepTime: this.state.prepTime + 5
        })
    }

    _increase30() {
        this.setState({
            prepTime: this.state.prepTime + 30
        })
    }

    _decrease5() {
        if (this.state.prepTime - 5 < 0) {
            this.setState({
                prepTime: 0
            })
        } else {
            this.setState({
                prepTime: this.state.prepTime - 5
            })
        }
    }

    _decrease30() {
        if (this.state.prepTime - 30 >= 0) {
            this.setState({
                prepTime: this.state.prepTime - 30
            })
        }
    }

    _increaseServing() {
        this.setState({
            servings: this.state.servings + 1
        })
    }

    _decreaseServing() {
        if (this.state.servings > 0) {
            this.setState({
                servings: this.state.servings - 1
            })
        }
    }

    render() {
        let ingredients = this.state.ingredientsArray.map((data, i) => {
            return <View key={i}><IngredientListItem {...data} /></View>
        })

        return (
            <ScrollView style={styles.body}>
                <AddIngredient ref={'ADD_INGREDIENT'} addIngredient={this._addIngredient.bind(this)}/>
                <View style={{marginTop: dims.height * 0.1}}/>

                <View style={styles.row}>
                    <Text style={styles.text}>Name: </Text>
                    <TextInput style={styles.textInput}
                               onChangeText={(name) => this.setState({name})}
                               value={this.state.name}/>
                </View>

                <View style={{marginTop: dims.height * -0.01}}/>

                <View style={styles.row}>
                    <Text style={styles.text}>Difficulty: </Text>
                    <Picker style={{flex: 1}}
                            hitSlop={{top: 0, bottom: 15, right: 10, left: 10}}
                            mode='dropdown'
                            selectedValue={this.state.difficulty}
                            onValueChange={(difficulty) => this.setState({difficulty})}>
                        <Picker.Item label={difficulties.hard} value={difficulties.hard}/>
                        <Picker.Item label={difficulties.medium} value={difficulties.medium}/>
                        <Picker.Item label={difficulties.easy} value={difficulties.easy}/>
                    </Picker>
                </View>

                <View style={{marginTop: dims.height * 0.01}}/>

                <View style={styles.column}>
                    <Text style={styles.text}>Prep Time (min):</Text>
                    <View style={[styles.row, {justifyContent: 'center'}]}>
                        <TouchableHighlight style={styles.button} onPress={this._decrease30.bind(this)}
                                            underlayColor={colors.leatherLight}>
                            <Text style={styles.buttonText}>-30</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button} onPress={this._decrease5.bind(this)}
                                            underlayColor={colors.leatherLight}>
                            <Text style={styles.buttonText}>-5</Text>
                        </TouchableHighlight>
                        <Text
                            style={[styles.text, {minWidth: dims.width * 0.12, textAlign: 'center'}]}>
                            {this.state.prepTime}
                        </Text>
                        <TouchableHighlight style={styles.button} onPress={this._increase5.bind(this)}
                                            underlayColor={colors.leatherLight}>
                            <Text style={styles.buttonText}>+5</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button} onPress={this._increase30.bind(this)}
                                            underlayColor={colors.leatherLight}>
                            <Text style={styles.buttonText}>+30</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={styles.column}>
                    <Text style={styles.text}>Servings:</Text>
                    <View style={[styles.row, {justifyContent: 'center'}]}>
                        <TouchableHighlight style={styles.button}
                                            onPress={this._decreaseServing.bind(this)}
                                            underlayColor={colors.leatherLight}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableHighlight>
                        <Text
                            style={[styles.text, {minWidth: dims.width * 0.12, textAlign: 'center'}]}>
                            {this.state.servings}
                        </Text>
                        <TouchableHighlight style={styles.button}
                                            onPress={this._increaseServing.bind(this)}
                                            underlayColor={colors.leatherLight}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={[styles.column]}>
                    <Text style={styles.text}>Ingredients:</Text>
                    {ingredients}
                    <View style={[styles.row, {marginLeft: dims.width * 0.05}]}>
                        <TouchableHighlight style={styles.button}
                                            onPress={() => this.refs['ADD_INGREDIENT'].setModalVisible(true)}
                                            underlayColor={colors.leatherLight}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableHighlight>
                        <Text>Add ingredient...</Text>
                    </View>
                </View>

                <View style={{height: dims.height * 0.1}}/>
            </ScrollView>
        )
    }
}

function leftButtonFunc(route, navigator, index, navState) {
    return <TouchableHighlight
        underlayColor='transparent'
        onPress={() => navigator.pop()}
        style={styles.navBarButton}>
        <Icon name='arrow-left' size={30} color={colors.parchmentLight}/>
    </TouchableHighlight>;
}

function rightButtonFunc(route, navigator, index, navState) {
    return <TouchableHighlight
        underlayColor='transparent'
        onPress={() => {this._addRecipe.bind(this)}}
        style={styles.navBarButton}>
        <Icon name='check' size={30} color={colors.parchmentLight}/>
    </TouchableHighlight>;
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: colors.parchmentLight,
        height: dims.height,
        flex: 1,
        paddingLeft: dims.width * 0.05,
        paddingRight: dims.width * 0.05
    },
    navBarButton: {
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
    text: {
        fontSize: 20
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

let AddRecipeRoute = new Route(1, 'Add Recipe', 'add-recipe', <AddRecipeContainer />, leftButtonFunc, rightButtonFunc);
export {AddRecipeRoute};

export default AddRecipeContainer;