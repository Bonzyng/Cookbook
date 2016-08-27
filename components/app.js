import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import SplashScreen from './SplashScreen/splash-screen';
import AuthContainer from './AuthContainer/auth-container';
import AddRecipeContainer from './Recipe/add-recipe-container';

import {logo} from './../styles/global-styles'

class App extends Component {
    render() {
        // return (
        //     <AddRecipeContainer />
        // );
        // TODO Return this to normal
        return (
            <SplashScreen logo={logo} duration={0}>
                <AuthContainer />
            </SplashScreen>
        );
    }
}

export default App;