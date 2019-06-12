import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import AuthUserContext from './context'
import { withFirebase } from '../Firebase'

const state = observable({
    user: null
})

const withAuthentication = Component => {

    @observer
    class WithAuthentication extends React.Component {

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(user => {
                user
                    ? state.user = user
                    : state.user = null
            })
        }
    
        componentWillUnmount() {
            this.listener()
        }

        render() {
            return (
                <AuthUserContext.Provider value={state.user}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            )
        }
    }

    return withFirebase(WithAuthentication)
}

export default withAuthentication