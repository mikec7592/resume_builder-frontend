import React, { Component } from 'react'

class HomePage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            masterDropdown: true,
        }
    }

    render() {
        return (
            <div>
                <h2>Resume Builder</h2>
                <h3>An app that Builds Resumes</h3>
              </div>
        ); 
    }
}

export default HomePage