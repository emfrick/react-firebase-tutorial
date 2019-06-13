import React from 'react'

import { PasswordForgotForm } from '../PasswordForget'
import PasswordChangeForm from '../PasswordChange'
import { AuthUserContext, withAuthorization } from '../Session'
import { withStore } from '../../store'

const AccountPage = (props) => (
    <div>
        <h1>Account: {props.store.user.email}</h1>
        <PasswordForgotForm />
        <PasswordChangeForm />
    </div>
)

const condition = user => !!user

export default withAuthorization(condition)(withStore(AccountPage))