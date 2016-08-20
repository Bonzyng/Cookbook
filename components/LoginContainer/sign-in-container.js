import React, {Component} from 'react'

import SignIn from './sign-in'
import SignUp from './sign-up'
import stylesheet from '../../styles/global-styles';

class SignInContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasAccount: true
        }
    }

    userHasAccount() {
        this.setState({hasAccount: true});
        this.props.stripErrors();
    }

    userDoesntHaveAccount() {
        this.setState({hasAccount: false});
        this.props.stripErrors();
    }

    render() {
        return (
            this.state.hasAccount ?
                <SignIn style={stylesheet.container} error={this.props.error} signIn={this.props.signIn}
                        click={this.userDoesntHaveAccount.bind(this)}/>
                :
                <SignUp style={stylesheet.container} error={this.props.error} signUp={this.props.signUp} click={this.userHasAccount.bind(this)}/>
        )
    }
}

export default SignInContainer;