import app from 'firebase/app'

import config from './firebase'
import FirebaseContext from './context'

class Firebase {

    constructor() {
        app.initializeApp(config)
    }

}

export default Firebase

export { FirebaseContext }