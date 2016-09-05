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

        // FIXME Possibly need to change to on()/off() instead of once(). Might cause issues with re-rendering after 'child_X' events
        return database.ref('users/' + auth.getUserUid() + '/recipes/' + formattedName)
            .once('value'.then(function (snapshot) {
                return snapshot.val();
            }));
    }

    onChange(func) {
        database.ref('users/' + auth.getUserUid() + '/recipes').on('child_changed', function(data) {
           func(data);
        });
    }

    onDelete(func) {
        database.ref('users/' + auth.getUserUid() + '/recipes').on('child_removed', function(data) {
            func(data);
        });
    }

    onCreate(func) {
        database.ref('users/' + auth.getUserUid() + '/recipes').on('child_added', function(data) {
            func(data);
        });
    }
}

// TODO Listener for recipe-list to update when a recipe is added/removed

export default recipeApi;