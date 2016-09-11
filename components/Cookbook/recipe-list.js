import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import ScrollableList from 'react-native-scrollable-list';
import Events from 'react-native-simple-events';

import RecipeListItem from './recipe-list-item';
import auth from '../../stores/auth';
import {colors} from '../../styles/global-styles';
import {recipeRouteMaker} from '../Recipe/recipe-container';

const listenerId = 'RecipeListListener';

class RecipeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: []
        };

        this.rows = [];

        this._getRecipes = this._getRecipes.bind(this);
    }

    componentDidMount() {
        this._getRecipes();

        if (!this.rows) {
            this.rows = [];
        }

        Events.on('RECIPES_UPDATE', listenerId, this._getRecipes);
    }

    componentWillUnmount() {
        Events.rm('RECIPES_UPDATE', listenerId);
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

    fetchGroceryList() {
        let recipes = [];
        if (this.rows) {
            this.rows.forEach((e) => {
                recipes.push(e.fetchData());
            })
        }

        alert(JSON.stringify(recipes));
    }

    // TODO use renderSeparator and height: StyleSheet.hairlineWidth. See https://medium.com/@spencer_carli/react-native-basics-how-to-use-the-listview-component-a0ec44cf1fe8#.8qrpnww2h
    render() {
        return <ScrollableList style={{backgroundColor: colors.parchmentLight}} data={this.state.recipes}
                               enableEmptySections={true}
                               renderRow={(data, section, index) => <RecipeListItem recipe={data}
                                                                                    ref={(row) => this.rows[index] = row}
                                                                                    navigateTo={this._navigateToRecipe.bind(this)}/>}/>
    }
}

export default RecipeList;
