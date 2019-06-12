import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const SignUpPage = () => (
    <div>
        <h1>Sign Up</h1>
        <SignupForm />
    </div>
)

const signupState = observable({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    error: null
})

@observer
class SignupFormBase extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(evt) {
        const {username, email, password } = signupState

        evt.preventDefault()

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(user => {
                return this.props.firebase
                    .user(user.user.uid)
                    .set({
                        username,
                        email
                    })
            })
            .then(() => {
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                signupState.error = error
            })
    }

    onChange(evt) {
        signupState[evt.target.name] = evt.target.value
        // this.setState({ [evt.target.name]: evt.target.value })
    }

    render() {
        const {
            username,
            email,
            password,
            passwordConfirm,
            error
        } = signupState

        const isInvalid = password !== passwordConfirm || password === '' || email === '' || username === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input name="username" value={username} onChange={this.onChange} type="text" placeholder="Full Name" />
                <input name="email"    value={email}    onChange={this.onChange} type="text" placeholder="Email Address" />
                <input name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
                <input name="passwordConfirm" value={passwordConfirm} onChange={this.onChange} type="password" placeholder="Confirm Password" />

                <button type="submit" disabled={isInvalid}>Sign Up</button>

                { error && <p>{error.message}</p> }
            </form>
        )
    }
}

const SignupLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
)

const SignupForm = compose(
    withRouter,
    withFirebase,
)(SignupFormBase)

export default SignUpPage

export { SignupForm, SignupLink }