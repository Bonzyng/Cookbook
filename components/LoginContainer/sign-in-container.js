import React, {Component} from 'react'

import SignIn from './sign-in'
import SignUp from './sign-up'

class SignInContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasAccount: true
        }
    }

    userHasAccount() {
        this.setState({hasAccount: true});
        this.props.clearErrors();
    }

    userDoesntHaveAccount() {
        this.setState({hasAccount: false});
        this.props.clearErrors();
    }

    render() {
        return (
            this.state.hasAccount ?
                <SignIn error={this.props.error} signIn={this.props.signIn}
                        click={this.userDoesntHaveAccount.bind(this)}/>
                :
                <SignUp error={this.props.error} signUp={this.props.signUp} click={this.userHasAccount.bind(this)}/>
        )
    }
}

export default SignInContainer;