import React, { Component } from 'react'

class MasterResume extends Component{
    constructor(props) {
        super(props)
        this.state = {
            masterDropdown: true,
        }
    }

    render() {
        return (
            <div>
                {this.props.name ? <h2 className="master-name">{this.props.name}</h2> : ''}
                {this.props.masterResume ?
                <h3 className="master-tag">{this.props.masterResume.title}</h3> : '' }
               
                <div className="master-summary">
                    {this.props.masterResume ? this.props.masterResume.summery : '' }
                </div>
                <dl className="master-skills">
                    <dt>Skills:</dt>
                    <dd>A skill</dd>
                    <dd>Another skill</dd>
                    <dd>Yet another skill</dd>
                </dl>
                <dl className="master-experience">
                    <dt>Lumber Yard <span className="master-experience-dates"> 1999-2021</span></dt>
                    <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet commodo nulla facilisi.</dd>
                    <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet commodo nulla facilisi.</dd>
                </dl>
            </div>

        );
        
    }
}

export default MasterResume