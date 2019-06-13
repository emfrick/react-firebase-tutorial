import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { withFirebase } from '../Firebase'
import { withStore } from '../../store'
import * as ROUTES from '../../constants/routes'

const PasswordForgotPage = () => (
    <div>
        <h1>Forgot Password</h1>
        <PasswordForgotForm />
    </div>
)

@observer
class PasswordForgotFormBase extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(evt) {
        const { user, error } = this.props.store
        
        evt.preventDefault()

        this.props.firebase
            .doPasswordReset(user.email)
            .catch(err => {
                error = err
            })
    }

    onChange(evt) {
        this.props.store.user[evt.target.name] = evt.target.value
    }

    render() {
        const { user, error } = this.props.store
        const isInvalid = user.email === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input name="email" value={user.email} onChange={this.onChange} type="text" placeholder="Email Address" />
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

const PasswordForgotForm = withFirebase(withStore(PasswordForgotFormBase))

export { PasswordForgotForm, PasswordForgotLink }