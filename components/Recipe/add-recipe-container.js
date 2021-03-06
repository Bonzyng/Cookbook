import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    Picker,
    AsyncStorage,
} from 'react-native';
import Events from 'react-native-simple-events';
import Icon from 'react-native-vector-icons/FontAwesome';

import Route from '../Navigation/route';
import IngredientListItem from './ingredient-list-item';
import AddIngredient from './add-ingredient';
import Button from './../Button/button';
import auth from '../../stores/auth';
import {colors, dims} from '../../styles/global-styles';

const difficulties = {
    hard: 'Hard',
    medium: 'Medium',
    easy: 'Easy'
};

let addRecipePtr, addRecipeContext;

class AddRecipeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            category: '',
            time: 0,
            difficulty: difficulties.medium,
            servings: 0,
            tags: {},
            instructions: '',
            ingredientsArray: [],
            instructionsTextHeight: 0,
        };

        addRecipeContext = this;
        addRecipePtr = this._addRecipe;
    }

    _addIngredient(ingredient) {
        this.setState({
            ingredientsArray: [...this.state.ingredientsArray, ingredient]
        });
    }

    _addRecipe() {
        if (this._valuesAreLegal()) {
            AsyncStorage.getItem(auth.getUserUid() + '/recipes')
                .then((value) => {
                    let arr = JSON.parse(value);
                    arr.push(this.state);
                    AsyncStorage.setItem(auth.getUserUid() + '/recipes', JSON.stringify(arr))
                        .then(Events.trigger('RECIPES_UPDATE'))
                        .done();
                })
                .catch(() => {
                    AsyncStorage.setItem(auth.getUserUid() + '/recipes', JSON.stringify([this.state]))
                        .then(Events.trigger('RECIPES_UPDATE'))
                        .done();
                }).done();


            this.props.navigator.pop();
        } else {
            alert('You are missing some mandatory fields. Can\'t add recipe!');
        }
    }

    _valuesAreLegal() {
        return this.state.name &&
            this.state.time > 0 &&
            this.state.servings > 0 &&
            this.state.instructions &&
            this.state.ingredientsArray.length > 0;
    }

    _increase5() {
        this.setState({
            time: this.state.time + 5
        })
    }

    _increase30() {
        this.setState({
            time: this.state.time + 30
        })
    }

    _decrease5() {
        if (this.state.time - 5 < 0) {
            this.setState({
                time: 0
            })
        } else {
            this.setState({
                time: this.state.time - 5
            })
        }
    }

    _decrease30() {
        if (this.state.time - 30 >= 0) {
            this.setState({
                time: this.state.time - 30
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
        });

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

                <View style={styles.row}>
                    <Text style={styles.text}>Category: </Text>
                    <TextInput style={styles.textInput}
                               onChangeText={(category) => this.setState({category})}
                               value={this.state.category}/>
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
                            {this.state.time}
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

                <View style={styles.column}>
                    <Text style={styles.text}>Description:</Text>
                    <TextInput
                        style={[styles.textInput, {height: Math.max(dims.height * 0.075, this.state.instructionsTextHeight)}]}
                        multiline={true}

                        onChange={(event) => {
                            this.setState({
                                instructions: event.nativeEvent.text,
                                instructionsTextHeight: event.nativeEvent.contentSize.height,
                            });
                        }}
                        value={this.state.instructions}
                    />
                </View>

                <View style={[styles.row, {flex: 1, justifyContent: 'center', padding: dims.height * 0.05}]}>
                    <Button
                        onPress={this._addRecipe.bind(this)}
                    >
                        Add Recipe
                    </Button>
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
        onPress={addRecipePtr.bind(addRecipeContext)}
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