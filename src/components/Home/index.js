import React from 'react'

import { withAuthorization } from '../Session'

const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p>Home page is accessible by signed in users.</p>
    </div>
)

const condition = user => !!user

export default withAuthorization(condition)(HomePage)