import React, { Component } from 'react'
import history from '../history';

class ExperianceForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            placeOfWork: '',
            yearsWorked: '',
            listPoints: '',
        }
    }

    componentDidMount() {
        if (this.props.job) {
            console.log(this.props.job)
            this.setState({
                placeOfWork: this.props.job.placeOfWork,
                yearsWorked: this.props.job.yearsWorked,
                listPoints: this.props.job.listPoints,
            })
        }
    }
    

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value}) 
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const experiance = {
            placeOfWork: this.state.placeOfWork,
            yearsWorked: this.state.yearsWorked,
            listPoints: this.state.listPoints,
        }
        if (this.props.job) {
            this.props.handleExperianceUpdate(this.props.job, experiance)
        } else {
            this.props.handleExperianceAdd(experiance)
        }
        this.setState({
            placeOfWork: '',
            yearsWorked: '',
            listPoints: '',
        })
    }

     handleEdit = (job) => {
         this.setState({
            placeOfWork: job.placeOfWork,
            yearsWorked: job.yearsWorked,
            listPoints: job.listPoints,
        });
    }

    render() {
            return (  
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Experience:</legend>
                        <div className="row">
                            <div className="eight columns">
                                <label htmlFor="placeOfWork">Work Place</label>
                                <input type="text" className="u-full-width" onChange={this.handleChange} id="placeOfWork" value={this.state.placeOfWork} />
                            </div>

                            <div className="four columns">
                                <label htmlFor="yearsWorked">Years</label>
                                <input type="text" className="u-full-width" onChange={this.handleChange} id="yearsWorked" value={this.state.yearsWorked} />
                            </div>
                        </div>
                        
                        <label htmlFor="listPoints">Details</label>
                        <input type="text" className="u-full-width" onChange={this.handleChange} id="listPoints" value={this.state.listPoints} />
                    </fieldset>

                    <input className="u-full-width button-primary" type="submit" value="Submit" />
                </form>
            )
        } 
    }

export default ExperianceForm