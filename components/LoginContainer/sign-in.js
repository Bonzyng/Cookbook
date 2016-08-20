import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Image, Dimensions} from 'react-native';
import TextField from 'react-native-md-textinput';
import Button from 'apsl-react-native-button';

import {colors, dims, logo} from '../../styles/global-styles'

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    signIn() {
        let email = this.refs.email.state.text;
        let password = this.refs.password.state.text;
        if (!!this.refs.email.state.text && !!this.refs.password.state.text) {
            this.props.signIn(email, password);
        }
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={[this.props.style, {height: dims.height*1}]}>
                <View style={styles.titleContainer}>
                    <Image style={styles.logo} source={logo}
                           resizeMode={Image.resizeMode.contain}/>
                </View>
                <View style={styles.loginContainer}>
                    <TextField
                        dense={true}
                        label={'Email'}
                        highlightColor={colors.brownPen}
                        keyboardType={'email-address'}
                        textColor={colors.brownPen}
                        labelColor={colors.brownPen}
                        ref="email"
                    />
                    <TextField
                        dense={true}
                        label={'Password'}
                        highlightColor={colors.brownPen}
                        keyboardType={'default'}
                        textColor={colors.brownPen}
                        labelColor={colors.brownPen}
                        secureTextEntry={true}
                        ref="password"
                    />
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorMessage}>{this.props.error}</Text>
                    </View>
                    <View style={styles.signInButtonView}>
                        <Button
                            onPress={this.signIn.bind(this)}
                            style={styles.mainButton}
                            textStyle={{color: colors.parchmentLight}}>
                            Sign in
                        </Button>
                    </View>
                </View>
                <View style={styles.signUpButtonView}>
                    <Button
                        style={styles.secondaryButton}
                        textStyle={{color: colors.brownPen, opacity: 0.8, borderColor: 'black'}}
                        onPress={this.props.click}>
                        Don't have an account? Sign up!
                    </Button>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
    },
    loginContainer: {
        paddingLeft: dims.width * 0.05,
        paddingRight: dims.width * 0.05
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: dims.height * 0.10,
        marginBottom: dims.height * 0.05
    },
    title: {
        color: colors.brownPen,
        fontSize: 25
    },
    logo: {
        flex: 1,
        height: dims.height * 0.3
    },
    signInButtonView: {
        marginTop: dims.height * 0.01
    },
    signUpButtonView: {
        marginTop: dims.height * 0.05,
        justifyContent: 'flex-end'
    },
    errorContainer: {
        marginTop: dims.height * 0.01,
        alignItems: 'center'
    },
    errorMessage: {
        color: '#FF6161'
    },
    mainButton: {
        backgroundColor: colors.leather,
        borderWidth: 1,
        borderColor: colors.leatherLight
    },
    secondaryButton: {
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'rgba(255, 255, 255, 1)'
    }
});

export default SignIn;