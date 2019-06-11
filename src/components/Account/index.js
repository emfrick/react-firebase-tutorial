import React from 'react'

import { PasswordForgotForm } from '../PasswordForget'
import PasswordChangeForm from '../PasswordChange'
import { AuthUserContext, withAuthorization } from '../Session'

const AccountPage = () => (
    <AuthUserContext.Consumer>
        { user => (
            <div>
                <h1>Account: {user.email}</h1>
                <PasswordForgotForm />
                <PasswordChangeForm />
            </div>
        )}
    </AuthUserContext.Consumer>
)

const condition = user => !!user

export default withAuthorization(condition)(AccountPage)