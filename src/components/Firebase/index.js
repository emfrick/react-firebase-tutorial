import app from 'firebase/app'
import auth from 'firebase/auth'
import 'firebase/database'

import config from './firebase'
import FirebaseContext, { withFirebase } from './context'

class Firebase {

    constructor() {
        app.initializeApp(config)

        this.auth = app.auth()
        this.db = app.database()

        this.doCreateUserWithEmailAndPassword = this.doCreateUserWithEmailAndPassword.bind(this)
        this.doSignInWithEmailAndPassword = this.doSignInWithEmailAndPassword.bind(this)
        this.doSignOut = this.doSignOut.bind(this)
        this.doPasswordReset = this.doPasswordReset.bind(this)
        this.doPasswordUpdate = this.doPasswordUpdate.bind(this)

        this.user = this.user.bind(this)
        this.users = this.users.bind(this)
    }

    /*========== AUTH API ==========*/

    doCreateUserWithEmailAndPassword(email, password) {
        return this.auth.createUserWithEmailAndPassword(email, password)
    }

    doSignInWithEmailAndPassword(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    doSignOut() {
        return this.auth.signOut()
    }

    doPasswordReset(email) {
        return this.auth.sendPasswordResetEmail(email)
    }

    doPasswordUpdate(password) {
        return this.auth.currentUser.updatePassword(password)
    }

    /*========== USER API ==========*/
    user(uid) {
        return this.db.ref(`users/${uid}`)
    }

    users() {
        return this.db.ref('users')
    }
}

export default Firebase

export { FirebaseContext, withFirebase }