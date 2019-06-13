import React from 'react'
import { observer } from 'mobx-react'

import AuthUserContext from './context'
import { withFirebase } from '../Firebase'
import { withStore } from '../../store'

const withAuthentication = Component => {

    @observer
    class WithAuthentication extends React.Component {

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(user => {
                user
                    ? this.props.store.user = user
                    : this.props.store.user = null
            })
        }
    
        componentWillUnmount() {
            this.listener()
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.props.store.user}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            )
        }
    }

    return withFirebase(withStore(WithAuthentication))
}

export default withAuthentication