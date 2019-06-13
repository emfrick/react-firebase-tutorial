import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { withAuthorization } from '../Session'
import { withStore } from '../../store'

@observer
class HomePage extends Component {

    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
    }

    onChange(evt) {
        this.props.store.test = evt.target.value
    }

    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <p>Home page is accessible by signed in users.</p>
                <p>Test: {this.props.store.test}</p>
                <input value={this.props.store.test} onChange={this.onChange} type="text" placeholder="Test" />
            </div>
        )
    }
}

const condition = user => !!user

export default withAuthorization(condition)(withStore(HomePage))