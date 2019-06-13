import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { withFirebase } from '../Firebase'
import { withAuthorization } from '../Session'
import { withStore } from '../../store'

@observer
class AdminPage extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.store.admin.loading = true

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val()

            const usersList = Object.keys(usersObject).map(key =>({
                ...usersObject[key],
                uid: key
            }))

            this.props.store.admin.users = usersList
            this.props.store.admin.loading = false
        })
    }

    componentWillUnmount() {
        this.props.firebase.users().off()
    }

    render() {
        const { users, loading } = this.props.store.admin

        return (
            <div>
                <h1>Admin</h1>

                { loading && <div>Loading...</div> }

                <UserList users={users} />
            </div>
        )
    }
}

const UserList = ({ users }) => (
    <ul>
        {users.map(user => (
            <li key={user.uid}>
                <span>
                    <strong>ID:</strong> {user.uid}
                </span>
                <span>
                    <strong>Email:</strong> {user.email}
                </span>
                <span>
                    <strong>Username:</strong> {user.username}
                </span>
            </li>
        ))}
    </ul>
)

const condition = user => !!user

export default withFirebase(withAuthorization(condition)(withStore(AdminPage)))