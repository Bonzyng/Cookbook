import React, {Component} from 'react';
import {Text, StyleSheet, ActivityIndicator, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import SignInContainer from '../LoginContainer/sign-in-container';
import NavigatorContainer from '../Navigation/NavigatorContainer/navigator-container';
import RecipeContainer from '../Recipe/recipe-container';

import auth from './../../stores/auth';
import api from './../../stores/api';

import {createConnector} from 'cartiv';
const connect = createConnector(React);

@connect(auth)
class AuthContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        api.auth.initFirebaseListener();
    }

    render() {
        let spinner;
        if (this.state.loading) {
            spinner = <Spinner visible={true}/>
        }
        return (
            this.state.isAuth ?
                // Authenticated
                <NavigatorContainer user={this.state.user}/>
                :
                // Not authenticated
                <View>
                    <SignInContainer error={this.state.error} stripErrors={api.auth.stripErrors.bind(this)}
                                     signIn={api.auth.signIn.bind(this)} signUp={api.auth.signUp.bind(this)}/>
                </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    }
});

export default AuthContainer