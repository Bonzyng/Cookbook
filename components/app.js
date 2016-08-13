import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import SplashScreen from './SplashScreen/splash-screen';
import AuthContainer from './AuthContainer/auth-container';

class App extends Component {
    render() {
        return (
            <SplashScreen logo={require('./../assets/placeholder-logo.png')} duration={0}
                          backgroundColor={styles.splashScreenContainer}>
                <AuthContainer />
            </SplashScreen>
        );
    }
}

const styles = StyleSheet.create({
    splashScreenContainer: {
        backgroundColor:'#e91e63'
    }
});

export default App;