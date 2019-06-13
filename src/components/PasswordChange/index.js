import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { withFirebase } from '../Firebase'
import { withStore } from '../../store'

@observer
class PasswordChangeForm extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(evt) {
        const { password, error } = this.props.store

        evt.preventDefault()

        this.props.firebase
            .doPasswordUpdate(password.one)
            .catch(err => {
                error = err
            })
    }

    onChange(evt) {
        this.props.store.password[evt.target.name] = evt.target.value
    }

    render() {
        const { password, error } = this.props.store
        const isInvalid = password.one !== password.two || password.one === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input name="one" value={password.one} onChange={this.onChange} type="password" placeholder="New Password" />
                <input name="two" value={password.two} onChange={this.onChange} type="password" placeholder="Confirm New Password" />
                <button disabled={isInvalid} type="submit">Change Password</button>

                { error && <p>{error.message}</p> }
            </form>
        )
    }
}

export default withFirebase(withStore(PasswordChangeForm))