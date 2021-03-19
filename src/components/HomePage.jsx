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
            <div className='homepage'>
                <h2>Resume Builder</h2>
                <h3>An app that builds Resumes</h3>
                <div className="ascii">¯\_(ツ)_/¯</div>
              </div>
        ); 
    }
}

export default HomePage