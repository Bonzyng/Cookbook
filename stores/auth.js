import {createStore} from 'cartiv';
import api from './api';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDbeJoYEU2fdfb3vh9h8pzdsuXsrCpfZ3w",
    authDomain: "cookbook-569f0.firebaseapp.com",
    databaseURL: "https://cookbook-569f0.firebaseio.com",
    storageBucket: ""
};
const fb = firebase.initializeApp(config);

const database = fb.database();

// Keep only essential user data, so not to expose sensitive data to other components
function sanitizeUserData(user) {
    let clearUser = {};
    user.providerData.forEach((profile) => {
        clearUser['displayName'] = profile.displayName || user.displayName;
        clearUser['email'] = profile.email || user.email;
        clearUser['photoURL'] = profile.photoURL || user.photoURL;
    });
    return clearUser;
}

let auth = createStore(
    // Store configuration
    {
        api: api,
        name: 'auth',
        actions: ['signUp', 'signIn', 'signOut', 'initFirebaseListener', 'stripErrors', 'getUserUid']
    },
    // Store definition
    {
        getInitialState(){ // Like React! <3
            return {
                isAuth: false,
                loading: true,
                error: false,
                user: null
            }
        },
        initFirebaseListener(){
            this.setState({loading: true});
            fb.auth().onAuthStateChanged((user)=> {
                if (user) {
                    // User is signed in.
                    let sanitizedUser = sanitizeUserData(user);
                    this.setState({
                        user: sanitizedUser,
                        isAuth: true,
                        error: false
                    });
                } else {
                    // No user is signed in.
                    this.setState({
                        isAuth: false,
                        error: false
                    });
                }
                this.setState({loading: false});
            });
        },
        stripErrors(){
            this.setState({
                error: false
            });
        },
        signUp(displayName, email, password){
            this.setState({loading: true});
            console.log('create user', email, password);
            fb.auth().createUserWithEmailAndPassword(email, password)
                .then((payload)=> {
                    this.updateUserInfo({displayName: displayName});
                    this.addUserToDb(displayName, email);
                }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                this.setState({error: errorMessage});
                console.log('error', error);
            }).then(()=> {
                this.setState({loading: false});
            });
        },
        updateUserInfo(obj){
            this.setState({loading: true});
            let user = fb.auth().currentUser;
            let purified = {
                displayName: obj['displayName'] || user.displayName,
                photoURL: obj['photoURL'] || user.photoURL
            };
            user.updateProfile(purified).then((payload)=> {
                this.setState({
                    user: sanitizeUserData(fb.auth().currentUser)
                })
            }, (error) => {
                this.setState({error: error.message});
                console.log('error updating name', error);
            }).then(()=> {
                this.setState({loading: false});
            });
        },
        signIn(email, password){
            console.log('sign in', email, password);
            this.setState({loading: true});
            fb.auth().signInWithEmailAndPassword(email, password).then((payload)=> {
                // Observer (Firebase listener) should notify about login so basically nothing...
            }).catch((error)=> {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                this.setState({error: error.message});
                console.log(error.message);
            }).then(()=> {
                this.setState({loading: false});
            });
        },
        signOut(){
            console.log('sign out');
            fb.auth().signOut().then(()=> {
                // Success
            }, (err)=> {
                console.log(err);
            });
        },
        addUserToDb(displayName, email) {
            database.ref('users/' + fb.auth().currentUser.uid).set({
                username: displayName,
                email: email
            })
        },
        getUserUid() {
            return fb.auth().currentUser.uid;
        }
    });

export {database};
export default auth;