import * as firebase from 'firebase';
import {database} from './auth';
import auth from './auth';

// TODO Connect to server - CRUD methods for recipes
let addRecipe = function(recipe) {
    alert('Adding recipe ' + recipe.name);
};

let testDb = function() {
    database.ref('users/' + auth.getUserUid() + '/recipes/').on('value', function(snapshot){
        seen = [];

        // alert(JSON.stringify(snapshot.val(), function(key, val) {
        //     if (val != null && typeof val == "object") {
        //         if (seen.indexOf(val) >= 0) {
        //             return;
        //         }
        //         seen.push(val);
        //     }
        //     return val;
        // }), 4);

        for (var property in snapshot.val()) {
            if (snapshot.val().hasOwnProperty(property)) {
                alert(JSON.stringify(snapshot.val()[property], null, 4));
            }
        }
    });


    // TODO: This is adding a new recipe under the postKey
    // let newPostKey = database.ref().child('users').push().key;
    //
    // let newData = {
    //     name: 'recipe-name',
    //     prepTime: 30
    // };
    //
    // let updates = {};
    //
    // updates['users/' + auth.getUserUid() + '/recipes/' + newPostKey] = newData;
    //
    // let res = database.ref().update(updates);
    //
    // alert(res);

    // database.ref('users/' + auth.getUserUid()).set({
    //     test: 'TEST!'
    // })
};

export {addRecipe, testDb}