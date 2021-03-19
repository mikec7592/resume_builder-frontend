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
                <h2 className="master-name">{this.props?.name || ''}</h2>
                {this.props.masterResume ?
                    <h3 className="resume-item master-tag">
                        {this.props.masterResume.title}
                         <div className="overlay">
                        <span className="actions">
                            <button onClick={() => { this.props.handleChangeForm('title') }}>edit</button>
                        </span>
                    </div>
                    </h3>
                : ''}
               
                <div className="resume-item master-summary">
                    {this.props.masterResume !== "" ? this.props.masterResume.summery : 'Click to Add A Title'}
                    <div className="overlay">
                        <span className="actions">
                            <button onClick={() => { this.props.handleChangeForm('summery') }}>Edit</button> 
                        </span>
                    </div>
                </div>

                <div className="resume-item master-skills">
                    <div className="master-skills-title"><strong>Skills:</strong></div>
                    <div className="master-skills-items">{this.props.masterResume ? this.props.masterResume.skills : ''}</div>
                    <div className="overlay">
                        <span className="actions">
                            <button onClick={() => { this.props.handleChangeForm('skills') }}>Edit</button>
                        </span>
                    </div>
                </div>
                
                {this.props.masterResume.experience.length > 0 ?
                    <ul>
                        {this.props.masterResume.experience.map(job => {
                            return (
                                <li key={job._id}>
                                    <div className="resume-item master-experience">
                                    <div className="master-experience-detail">{job.placeOfWork}
                                        <span className="master-experience-dates"> {job.yearsWorked}</span>
                                    </div>    
                                        <div>{job.listPoints}</div>
                                        <div className="overlay">
                                            <span className="actions">
                                                <button onClick={() => { this.props.handleChangeForm('experiance') }}>Add</button> |
                                                <button onClick={() => { this.props.handleExperienceEdit(job) }}>Edit</button> |
                                                <button onClick={() => { this.props.handleExperianceDelete(job) }}>Delete</button>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    : 
                    <div className="resume-item master-experience">
                        <div>Click Add to add an item</div>
                            <div className="overlay">
                                <span className="actions">
                                    <button onClick={() => { this.props.handleChangeForm('experiance') }}>Add</button>
                                </span>
                            </div>
                        </div> 
                    }
            </div>

        );
        
    }
}

export default MasterResume