import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, Image} from 'react-native';
import TextField from 'react-native-md-textinput';
import Button from 'apsl-react-native-button';

import {colors, dims, logo} from '../../styles/global-styles';

class SignUp extends Component {
    constructor(props) {
        super(props);
    }

    signUp() {
        let email = this.refs.email.state.text;
        let password = this.refs.password.state.text;
        let displayName = this.refs.displayName.state.text;
        if (!!email && !!password) {
            this.props.signUp(displayName, email, password);
        }
    }

    render() {
        return (
            <ScrollView style={[styles.container, this.props.style]} showsVerticalScrollIndicator={false}>
                <View style={styles.titleContainer}>
                    <Image style={styles.logo} source={logo}
                           resizeMode={Image.resizeMode.contain}/>
                </View>
                <View style={styles.loginContainer}>
                    <TextField
                        dense={true}
                        label={'Display name'}
                        highlightColor={colors.brownPen}
                        keyboardType={'default'}
                        textColor={colors.brownPen}
                        labelColor={colors.brownPen}
                        ref="displayName"
                    />
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
                    <View style={styles.signUpButtonView}>
                        <Button
                            onPress={this.signUp.bind(this)}
                            style={styles.mainButton}
                            textStyle={{color: colors.parchmentLight}}>
                            Sign up
                        </Button>
                    </View>
                </View>

                <View style={styles.signInButtonView}>
                    <Button
                        style={styles.secondaryButton}
                        textStyle={{color: colors.brownPen, opacity: 0.8, borderColor: 'black'}}
                        onPress={this.props.click}>
                        Already have an account? Sign in!
                    </Button>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: dims.height * 1,
        flexDirection: 'column',
        flex: 1
    },
    loginContainer: {
        marginTop: dims.height * -0.10,
        paddingLeft: dims.width * 0.05,
        paddingRight: dims.width * 0.05
    },
    titleContainer: {
        flex: 5,
        alignItems: 'center',
        marginTop: dims.height * 0.10,
        marginBottom: dims.height * 0.05
    },
    title: {
        color: colors.brownPen,
        fontSize: 25
    },
    signUpButtonView: {
        flex: 1,
        flexDirection: 'column',
        marginTop: dims.height * 0.01,
        justifyContent: 'flex-end'
    },
    signInButtonView: {
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
    logo: {
        flex: 1,
        height: dims.height * 0.3
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

export default SignUp;