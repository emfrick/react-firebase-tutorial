import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { withFirebase } from '../Firebase'

const passwordState = observable({
    password: '',
    passwordConfirm: '',
    error: null
})

@observer
class PasswordChangeForm extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(evt) {
        const { password } = passwordState

        evt.preventDefault()

        this.props.firebase
            .doPasswordUpdate(password)
            .catch(error => {
                passwordState.error = error
            })
    }

    onChange(evt) {
        passwordState[evt.target.name] = evt.target.value
    }

    render() {
        const { password, passwordConfirm, error } = passwordState
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