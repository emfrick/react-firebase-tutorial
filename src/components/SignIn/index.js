import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { SignupLink } from '../SignUp'
import { PasswordForgotLink } from '../PasswordForget'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import { sign } from 'crypto';

const SignInPage = () => (
    <div>
        <h1>Sign In</h1>
        <SigninForm />
        <PasswordForgotLink />
        <SignupLink />
    </div>
)

const signinState = observable({
    email: '',
    password: '',
    error: null
})

@observer
class SigninFormBase extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(evt) {
        const { email, password } = signinState

        evt.preventDefault()

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                signinState.error = error
            })
    }

    onChange(evt) {
        signinState[evt.target.name] = evt.target.value
    }

    render() {
        const { email, password, error } = signinState

        const isInvalid = password === '' || email === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
                <input name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />

                <button disabled={isInvalid} type="submit">Sign In</button>

                { error && <p>{error.message}</p> }
            </form>
        )
    }
}

const SigninForm = compose(
    withRouter,
    withFirebase,
)(SigninFormBase)

export default SignInPage

export { SigninForm }