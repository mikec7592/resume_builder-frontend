import React, { Component } from 'react'
import { Link } from 'react-router-dom'



let baseURL = '';
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3003';
} else {
    baseURL = 'https://resumebuilderapi.herokuapp.com/';
}

class Resumes extends Component{

    getResumes = () => {
        fetch(baseURL + `/resumes/${this.props.user.token}`)
            .then(data => data.json(), error => console.log(error))
            .then(parsedData => this.setState({resumes: parsedData}), error => console.log(error))
        }
    render() {
        return (
            <div>
                <h2>Here is a list of resumes</h2>
                <button onClick={this.getResumes}></button>
                <ul>
                {this.props.resumes.map(resume => {
                    return (
                        <li key={resume._id}>
                            <Link to={`/resumes/${resume._id}` }>
                                {resume.title}
                            </Link>
                        </li>
                    )
                })}
                </ul>
            </div>
        ); 
    }
}

export default Resumes