import React, { Component } from 'react'
import history from '../history';

class SummeryForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            summery: '',
        }
    }

    
    componentDidMount() {
        this.setState({summery: this.props.summery})
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value}) 
    }

    
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSummeryChange(this.state.summery)
    }
    
    render() {
            return (  
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="summery">Summery</label>
                    <textarea className="u-full-width" onChange={this.handleChange} id="summery" value={this.state.summery}></textarea>

                    <input className="u-full-width button-primary" type="submit" value="Submit" />
                </form>
            )
        } 
    }

export default SummeryForm