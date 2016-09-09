import React, {Component} from 'react';
import ScrollableList from 'react-native-scrollable-list';

import RecipeListItem from './recipe-list-item';
import {colors} from '../../styles/global-styles';
import {database} from '../../stores/auth';
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
            recipes: recipes
        };
    }

    componentDidMount() {
        this._listenForRecipes();
    }


    _navigateToRecipe(recipe) {
        this.props.navigator.push(
            recipeRouteMaker(recipe)
        )
    }

    _listenForRecipes() {
        // alert('Getting recipes!');
        //
        // database.ref('users/' + auth.getUserUid() + '/recipes')
        //     .once('value', (snapshot) => {
        //         let data = snapshot.val();
        //         let arr = [];
        //
        //         // for(var k in data) {
        //         //     if (data.hasOwnProperty(k)) {
        //         //         arr.push(data[k]);
        //         //     }
        //         // }
        //         snapshot.forEach((child) => {
        //             arr.push(child.val());
        //         });
        //
        //         this.setState({
        //             recipes: this.state.recipes.cloneWithRows(arr)
        //         });
        //     })
    }

    // TODO use renderSeparator and height: StyleSheet.hairlineWidth. See https://medium.com/@spencer_carli/react-native-basics-how-to-use-the-listview-component-a0ec44cf1fe8#.8qrpnww2h
    render() {
        return <ScrollableList style={{backgroundColor: colors.parchmentLight}} data={this.state.recipes}
                               renderRow={(data) => <RecipeListItem recipe={data} navigateTo={this._navigateToRecipe.bind(this)} />}/>
    }
}

export default RecipeList;
