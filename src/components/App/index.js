import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation           from '../Navigation'
import LandingPage          from '../Landing'
import SignUpPage           from '../SignUp'
import SignInPage           from '../SignIn'
import ForgotPasswordPage   from '../PasswordForget'
import HomePage             from '../Home'
import AccountPage          from '../Account'
import AdminPage            from '../Admin'

import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(user => {
            user
                ? this.setState({ user })
                : this.setState({ user: null })
        })
    }

    componentWillUnmount() {
        this.listener()
    }

    render() {
        return (
            <Router>
                <div>
                    <Navigation user={this.state.user} />

                    <hr />

                    <Route exact path={ ROUTES.LANDING }         component={ LandingPage } />
                    <Route       path={ ROUTES.SIGN_UP }         component={ SignUpPage } />
                    <Route       path={ ROUTES.SIGN_IN }         component={ SignInPage } />
                    <Route       path={ ROUTES.FORGOT_PASSWORD } component={ ForgotPasswordPage } />
                    <Route       path={ ROUTES.HOME }            component={ HomePage } />
                    <Route       path={ ROUTES.ACCOUNT }         component={ AccountPage } />
                    <Route       path={ ROUTES.ADMIN }           component={ AdminPage } />
                </div>
            </Router>
        )
    }
}

export default withFirebase(App)