import React, { Component } from 'react'

class ResumeForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
    }

    componentDidMount() {
        this.setState({title: this.props.title})
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value}) 
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleTitleChange(this.state.title)
    }
    
    render() {
            return (  
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Professional Title</label>
                    <input type="text" className="u-full-width" onChange={this.handleChange} id="title" value={this.state.title} /> 

                    <input className="u-full-width button-primary" type="submit" value="Submit" />
                </form>
            )
        } 
    }

export default ResumeForm