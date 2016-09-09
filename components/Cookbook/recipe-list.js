import React, {Component} from 'react';
import ScrollableList from 'react-native-scrollable-list';

import RecipeListItem from './recipe-list-item';
import {colors} from '../../styles/global-styles';
import {database} from '../../stores/auth';

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
    }

    componentDidMount() {
        this._listenForRecipes();
    }


    _navigateToRecipe(name) {
        alert(name);
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
                               renderRow={(data) => <RecipeListItem {...data} navigateTo={this._navigateToRecipe.bind(this)} />}/>
    }
}

export default RecipeList;
