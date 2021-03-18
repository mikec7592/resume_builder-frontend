import React, { Component } from 'react'
import history from '../history';


let baseURL = ''

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3003';
} else {
    baseURL = 'production URL';
}


class ResumeForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            summery: '',
            school: '',
            yearsAttended: '',
            degree: '',
            placeOfWork: '',
            yearsWorked: '',
            listPoints: '',
            skills:''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value}) 
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(baseURL + '/resumes', {
            method: 'POST',
            body: JSON.stringify({
                userId: this.props.user.token,
                title: this.state.title,
                summery: this.state.summery,
                school: this.state.school,
                yearsAttended: this.state.yearsAttended,
                degree: this.state.degree,
                placeOfWork: this.state.placeOfWork,
                yearsWorked: this.state.yearsWorked,
                listPoints: this.state.listPoints,
                skills: this.state.skills,
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(jsonRes => {
                history.push('/')

                // this.setState({
                    // title: '',
                    // summery: '',
                    // school: '',
                    // yearsAttended: '',
                    // degree: '',
                    // placeOfWork: '',
                    // yearsWorked: '',
                    // listPoints: '',
                    // skills:''
                // })
            }).catch(error => console.log({ 'Error': error }));
    }
    
    render() {
            return (  
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Professional Title</label>
                    <input type="text" className="u-full-width" onChange={this.handleChange} id="title" value={this.state.title} /> 
                    
                    <label htmlFor="summery">Summery</label>
                    <textarea className="u-full-width" onChange={this.handleChange} id="summery" value={this.state.summery}></textarea>

                    <fieldset>
                        <legend>Education:</legend>
                            <div className="row">
                            <div className="four columns">
                                <label htmlFor="school">School</label>
                                <input type="text" className="u-full-width" onChange={this.handleChange} id="school" value={this.state.school} />
                            </div>

                            <div className="four columns">
                                <label htmlFor="yearsAttended">Years</label>
                                <input type="text" className="u-full-width" onChange={this.handleChange} id="yearsAttended" value={this.state.yearsAttended} />
                            </div>

                            <div className="four columns">
                                <label htmlFor="degree">Degree</label>
                                <input type="text" className="u-full-width" onChange={this.handleChange} id="degree" value={this.state.degree} />
                            </div>
                        </div>  
                    </fieldset>
                    
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

                    <label htmlFor="skills">Skills</label>
                    <input type="text" className="u-full-width" onChange={this.handleChange} id="skills" value={this.state.skills} /> 

                    <input className="u-full-width button-primary" type="submit" value="Submit" />
                </form>
            )
        } 
    }

export default ResumeForm