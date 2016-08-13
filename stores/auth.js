import * as firebase from 'firebase';
import {createStore} from 'cartiv';
import api from './api';

const firebaseConfig = {
    apiKey: "AIzaSyDbeJoYEU2fdfb3vh9h8pzdsuXsrCpfZ3w",
    authDomain: "cookbook-569f0.firebaseapp.com",
    databaseUrl: "https://cookbook-569f0.firebaseio.com",
    storageBucket: "cookbook-569f0.appspot.com"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

let auth = createStore(
    // Store configuration
    {
        api: api,
        name: 'auth',
        actions: ['signUp', 'signIn', 'initFirebaseListener', 'stripErrors']
    },
    // Store definition
    {
        getInitialState(){ // same as React!
            return {
                isAuth: false,
                loading: true,
                error: false,
                user: null
            }
        },
        initFirebaseListener(){
            this.setState({loading: true});
            firebaseApp.auth().onAuthStateChanged((user)=> {
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
            firebaseApp.auth().createUserWithEmailAndPassword(email, password)
                .then((payload)=> {
                    this.updateUserInfo({displayName: displayName});
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
            let user = firebaseApp.auth().currentUser;
            let purified = {
                displayName: obj['displayName'] || user.displayName,
                photoURL: obj['photoURL'] || user.photoURL
            };
            user.updateProfile(purified).then((payload)=> {
                this.setState({
                    user: sanitizeUserData(firebaseApp.auth().currentUser)
                })
            }, (error) => {
                this.setState({error: error.message});
                console.log('error updating name', error);
            }).then(()=> {
                this.setState({loading: false});
            });
        },
        signIn(email, password){
            console.log('signin', email, password);
            this.setState({loading: true});
            firebase.auth().signInWithEmailAndPassword(email, password).then((payload)=> {
                // Observer (Firebase listener) should notify about login so basically nothing...
            }).catch((error)=> {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                this.setState({error: error.message});
            }).then(()=> {
                this.setState({loading: false});
            });

        }
    });

// Keep only essential user data, so not to expose sensitive data to other components
function sanitizeUserData(user) {
    let clearUser={};
    user.providerData.forEach((profile) => {
        clearUser['displayName'] = profile.displayName || user.displayName;
        clearUser['email'] = profile.email ||  user.email;
        clearUser['photoURL'] = profile.photoURL || user.photoURL;
    });
    return clearUser;
}

export default auth;