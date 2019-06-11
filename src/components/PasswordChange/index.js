import React, { Component } from 'react'

import { withFirebase } from '../Firebase'

const INITIAL_STATE = {
    password: '',
    passwordConfirm: '',
    error: null
}

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit(evt) {
        const { password } = this.state

        evt.preventDefault()

        this.props.firebase
            .doPasswordUpdate(password)
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
        const { password, passwordConfirm, error } = this.state
        const isInvalid = password !== passwordConfirm || password === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input name="password" value={password} onChange={this.onChange} type="password" placeholder="New Password" />
                <input name="passwordConfirm" value={passwordConfirm} onChange={this.onChange} type="password" placeholder="Confirm New Password" />
                <button disabled={isInvalid} type="submit">Change Password</button>

                { error && <p>{error.message}</p> }
            </form>
        )
    }
}

export default withFirebase(PasswordChangeForm)