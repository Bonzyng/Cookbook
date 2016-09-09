import React, {Component} from 'react';
import ScrollableList from 'react-native-scrollable-list';

import RecipeListItem from './recipe-list-item';
import {colors} from '../../styles/global-styles';

import recipeApi from '../../stores/recipe-api';

// TODO Remove when switching to remote data fetching
const recipes = [
    {
        name: 'Lettuce Salad',
        category: 'Salad',
        servings: 4,
        time: 15,
        id: 1,
    },
    {
        name: 'Steak',
        category: 'Meat',
        servings: 2,
        time: 30,
        id: 2,
    },
    {
        name: 'Ice Cream',
        category: 'Dessert',
        servings: 3,
        time: 5,
        id: 3,
    },
];

class RecipeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: []
        };


        this._getRecipes();
    }
    
    _navigateToRecipe(name) {
        alert(name);
    }

    _getRecipes() {
        let data = recipeApi.readAllRecipes();
        let arr = [];

        for(var k in data) {
            if (data.hasOwnProperty(k)) {
                arr.push(data[k]);
            }
        }

        this.setState({
            recipes: arr
        });
    }

    // TODO use renderSeparator and height: StyleSheet.hairlineWidth. See https://medium.com/@spencer_carli/react-native-basics-how-to-use-the-listview-component-a0ec44cf1fe8#.8qrpnww2h
    render() {
        return <ScrollableList style={{backgroundColor: colors.parchmentLight}} data={this.state.recipes}
                               renderRow={(data) => <RecipeListItem {...data} navigateTo={this._navigateToRecipe.bind(this)} />}/>
    }
}

export default RecipeList;
