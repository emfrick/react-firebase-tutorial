import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { SignupLink } from '../SignUp'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const SignInPage = () => (
    <div>
        <h1>Sign In</h1>
        <SigninForm />
        <SignupLink />
    </div>
)

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
}

class SigninFormBase extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit(evt) {
        const { email, password } = this.state

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.setState({ error })
            })

        evt.preventDefault()
    }

    onChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    render() {
        const { email, password, error } = this.state

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