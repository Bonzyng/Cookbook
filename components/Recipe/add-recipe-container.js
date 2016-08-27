import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Route from '../Navigation/route';
import {colors, dims} from '../../styles/global-styles';

class AddRecipeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            prepTime: 0,
            difficulty: '',
            servings: 0,
            ingredients: {},
            tags: {},
            instructions: ''
        }
    }

    _addRecipe() {
        alert('Adding recipe!\nName: ' + this.state.name + '\nPrep time: ' + this.state.prepTime);
    }

    render() {
        return (
            <ScrollView style={styles.body}>
                <View style={{marginTop: dims.height * 0.1}}/>
                <View style={styles.row}>
                    <Text style={styles.text}>Name: </Text>
                    <TextInput style={styles.textInput}
                               onChangeText={(name) => this.setState({name})}
                               value={this.state.name}/>
                </View>
                <View style={styles.row}>
                <Text style={styles.text}>Prep Time: </Text>
                <TextInput style={styles.textInput}
                           onChangeText={(prepTime) => this.setState({prepTime})}
                           value={this.state.prepTime}/>
            </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Difficulty: </Text>
                    <TextInput style={styles.textInput}
                               onChangeText={(difficulty) => this.setState({difficulty})}
                               value={this.state.difficulty}/>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Servings: </Text>
                    <TextInput style={styles.textInput}
                               onChangeText={(servings) => this.setState({servings})}
                               value={this.state.servings}/>
                </View>
            </ScrollView>
        )
    }
}

function leftButtonFunc(route, navigator, index, navState) {
    return <TouchableHighlight
        underlayColor='transparent'
        onPress={() => navigator.pop()}
        style={styles.button}>
        <Icon name='arrow-left' size={30} color={colors.parchmentLight}/>
    </TouchableHighlight>;
}
function rightButtonFunc(route, navigator, index, navState) {
    return <TouchableHighlight
        underlayColor='transparent'
        onPress={() => {this._addRecipe.bind(this)}}
        style={styles.button}>
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
    button: {
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0
    },
    row: {
        backgroundColor: colors.parchmentLight,
        flexDirection: 'row',
        flex: 1,
        height: dims.height * 0.1,
        alignItems: 'center'
    },
    text: {
        fontSize: 23
    },
    textInput: {
        flex: 1
    }
});

let AddRecipeRoute = new Route(1, 'Add Recipe', 'add-recipe', <AddRecipeContainer />, leftButtonFunc, rightButtonFunc);
export {AddRecipeRoute};

export default AddRecipeContainer;