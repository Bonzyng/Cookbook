import React, {Component} from 'react';
import ScrollableList from 'react-native-scrollable-list';

import RecipeListItem from './recipe-list-item';
import {colors} from '../../styles/global-styles';

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
    _navigateToRecipe(name) {
        alert(name);
    }
    
    render() {
        return <ScrollableList style={{backgroundColor: colors.parchmentLight}} data={recipes} renderRow={(data) => <RecipeListItem {...data} navigateTo={this._navigateToRecipe.bind(this)} />}/>
    }
}

export default RecipeList;
