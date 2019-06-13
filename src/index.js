import React from 'react'
import ReactDOM from 'react-dom'
import { observable } from 'mobx'

import App from './components/App'
import Firebase, { FirebaseContext } from './components/Firebase'
import StoreContext from './store'

const appState = observable({
    test: 'Hello World'
})

ReactDOM.render(
    <StoreContext.Provider value={appState}>
        <FirebaseContext.Provider value={ new Firebase() }>
            <App />
        </FirebaseContext.Provider>
    </StoreContext.Provider>,
    document.getElementById('app')
)