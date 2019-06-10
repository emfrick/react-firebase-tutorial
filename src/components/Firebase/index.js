import app from 'firebase/app'
import auth from 'firebase/auth'

import config from './firebase'
import FirebaseContext, { withFirebase } from './context'

class Firebase {

    constructor() {
        app.initializeApp(config)

        this.auth = app.auth()

        this.doCreateUserWithEmailAndPassword = this.doCreateUserWithEmailAndPassword.bind(this)
        this.doSignInWithEmailAndPassword = this.doSignInWithEmailAndPassword.bind(this)
        this.doSignOut = this.doSignOut.bind(this)
        this.doPasswordReset = this.doPasswordReset.bind(this)
        this.doPasswordUpdate = this.doPasswordUpdate.bind(this)
    }

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
        return this.auth.sendPasswordResetEmail()
    }

    doPasswordUpdate(password) {
        return this.auth.currentUser.updatePassword(password)
    }

}

export default Firebase

export { FirebaseContext, withFirebase }