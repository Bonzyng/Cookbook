import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import ScrollableList from 'react-native-scrollable-list';

import RecipeListItem from './recipe-list-item';
import auth from '../../stores/auth';
import {colors} from '../../styles/global-styles';
import {recipeRouteMaker} from '../Recipe/recipe-container';

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
    },
    {
        name: 'Steak',
        category: 'Meat',
        servings: 2,
        time: 30,
        difficulty: 'Medium',
        id: 2,
    },
    {
        name: 'Ice Cream',
        category: 'Dessert',
        servings: 3,
        time: 5,
        difficulty: 'Medium',
        id: 3,
    },
];

class RecipeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: []
        };
    }

    componentDidMount() {
        this._getRecipes();
    }


    _navigateToRecipe(recipe) {
        this.props.navigator.push(
            recipeRouteMaker(recipe)
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

    // TODO use renderSeparator and height: StyleSheet.hairlineWidth. See https://medium.com/@spencer_carli/react-native-basics-how-to-use-the-listview-component-a0ec44cf1fe8#.8qrpnww2h
    render() {
        return <ScrollableList style={{backgroundColor: colors.parchmentLight}} data={this.state.recipes}
                               renderRow={(data) => <RecipeListItem recipe={data}
                                                                    navigateTo={this._navigateToRecipe.bind(this)}/>}/>
    }
}

export default RecipeList;
