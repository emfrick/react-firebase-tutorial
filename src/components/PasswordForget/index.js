import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const PasswordForgotPage = () => (
    <div>
        <h1>Forgot Password</h1>
        <PasswordForgotForm />
    </div>
)

const INITIAL_STATE = {
    email: '',
    error: null
}

class PasswordForgotFormBase extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit(evt) {
        const { email } = this.state
        
        evt.preventDefault()

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    onChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    render() {
        const { email, error } = this.state
        const isInvalid = email === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input name="email" value={this.state.email} onChange={this.onChange} type="text" placeholder="Email Address" />
                <button disabled={isInvalid} type="submit">Reset Password</button>

                { error && <p>{error.message}</p> }
            </form>
        )
    }
}

const PasswordForgotLink = () => (
    <p>
        <Link to={ROUTES.FORGOT_PASSWORD}>Forgot Password?</Link>
    </p>
)

export default PasswordForgotPage

const PasswordForgotForm = withFirebase(PasswordForgotFormBase)

export { PasswordForgotForm, PasswordForgotLink }