import React from 'react'
import { Link } from 'react-router-dom'

import { AuthUserContext } from '../Session'
import SignoutButton from '../SignOut'
import * as ROUTES from '../../constants/routes'

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            { user => user ? <NavigationAuth /> : <NavigationNonAuth /> }
        </AuthUserContext.Consumer>
    </div>
)

const NavigationAuth = () => (
    <div>
        <ul>
            <li>
                <Link to={ ROUTES.LANDING }>Landing</Link>
            </li>
            <li>
                <Link to={ ROUTES.HOME }>Home</Link>
            </li>
            <li>
                <Link to={ ROUTES.ACCOUNT }>Account</Link>
            </li>
            <li>
                <Link to={ ROUTES.ADMIN }>Admin</Link>
            </li>
            <li>
                <SignoutButton />
            </li>
        </ul>
    </div>
)

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ ROUTES.LANDING }>Landing</Link>
        </li>
        <li>
            <Link to={ ROUTES.SIGN_IN }>Sign In</Link>
        </li>
    </ul>
)

export default Navigation