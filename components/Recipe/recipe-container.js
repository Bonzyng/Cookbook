import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    DrawerLayoutAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ControlPanel from '../Navigation/control-panel';
import Route from '../Navigation/route';
import {colors, dims} from '../../styles/global-styles';
import {testDb} from '../../stores/recipe-api';

class RecipeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
    }

    render() {
        let ingredients = <Text>Placeholder for ingredients</Text> //this.props.ingredientsArray.map((data, i) => {
        //     return <View key={i}><IngredientListItem {...data} /></View>
        // });

        return (
            <DrawerLayoutAndroid
                ref={'DRAWER_REF'}
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => <ControlPanel user={this.props.user} />}>
                <View style={{marginTop: dims.height * 0.1}}/>
                <ScrollView style={styles.body}>
                    <Text style={[styles.text, {flex: 1, margin: 10}]}>Recipe Name: (Filled by props.name) {this.props.name}</Text>
                    <Text style={styles.smallText}>Preperation Time: {this.props.prepTime} minutes</Text>
                    <Text style={styles.smallText}>Difficulty: {this.props.difficulty}</Text>
                    <Text style={styles.smallText}>Servings: {this.props.servings}</Text>
                    <Text style={styles.smallText}>Ingredients List:</Text>
                    {ingredients}
                    <Text style={styles.smallText}>Instructions:</Text>


                    <TouchableHighlight
                        underlayColor='transparent'
                        style={styles.button}
                        onPress={() => testDb()}>
                        <Icon name='bars' size={30} color={colors.parchmentLight} style={{margin: 0, padding: 0}}/>
                    </TouchableHighlight>
                </ScrollView>
            </DrawerLayoutAndroid>
        )
    }
}

function leftButtonFunc(route, navigator, index, navState) {
    return <Icon name='bars' size={30} color={colors.parchmentLight}/>
}
function rightButtonFunc(route, navigator, index, navState) {
    return <Icon name='plus' size={30} color={colors.parchmentLight}/>
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

let RecipeRoute = new Route(0, 'Recipe', 'recipe', <RecipeContainer />, leftButtonFunc, rightButtonFunc);
export {RecipeRoute};

export default RecipeContainer;