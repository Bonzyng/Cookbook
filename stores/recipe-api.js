import * as firebase from 'firebase';
import {database} from './auth';
import auth from './auth';


class recipeApi {
    _formatName(name) {
        return name.toLowerCase().replace(/ /g, '_');
    }

    createRecipe(recipe) {
        let name = this._formatName(recipe.name);

        database.ref('users/' + auth.getUserUid() + '/recipes/' + name).set(recipe)
            .then(function () {
                console.log('Created recipe ' + recipe.name);
            })
            .catch(function (error) {
                console.log('Error creating recipe. ' + error);
            });
    }

    deleteRecipe(name) {
        let formattedName = this._formatName(name);

        database.ref('users/' + auth.getUserUid() + '/recipes/' + formattedName).remove()
            .then(function () {
                console.log('Successfully deleted recipe');
            })
            .catch(function (error) {
                console.log('Failed deleting recipe. ' + error);
            })
    }

    readRecipe(name) {
        let formattedName = this._formatName(name);

        return database.ref('users/' + auth.getUserUid() + '/recipes/' + formattedName)
            .once('value'.then(function (snapshot) {
                return snapshot.val();
            }));
    }
}

// TODO Listener for recipe-list to update when a recipe is added/removed

export default recipeApi;