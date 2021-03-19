import React, { Component } from 'react'
import history from '../history';

class SkillsForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            skills: ''
        }
    }

    componentDidMount() {
        this.setState({ skills: this.props.skills })
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value}) 
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSkillsChange(this.state.skills)
    }
    
    render() {
            return (  
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="skills">Skills</label>
                    <input type="text" className="u-full-width" onChange={this.handleChange} id="skills" value={this.state.skills} /> 

                    <input className="u-full-width button-primary" type="submit" value="Submit" />
                </form>
            )
        } 
    }

export default SkillsForm