import React, {Component} from 'react';
import ScrollableList from 'react-native-scrollable-list';

import ListItem from './list-item-recipe';

const recipes = [
    {
        name: 'Salad',
        category: 'Food\'s food',
        servings: 4,
        time: 15
    },
    {
        name: 'Steak',
        category: 'Meat',
        servings: 2,
        time: 30
    },
    {
        name: 'Ice Cream',
        category: 'Dessert',
        servings: 3,
        time: 5
    }
];

export default (<ScrollableList data={recipes} renderRow={(data) => <ListItem {...data} />}/>)
