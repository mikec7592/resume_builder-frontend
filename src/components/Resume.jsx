import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Resume extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.resume = this.props.resumes.find(resume => resume._id === this.props.match.params._id)
    }

    render() {
        return (
             <div>
                {/* <h2 className="master-name">{`${this.props.firstName} ${this.props.lastName} ` }</h2> */}
                <h3 className="master-tag">{this.resume.title}</h3>
                <div className="master-summary">{this.resume.summery}</div>
                <dl className="master-skills">
                    <dt>Skills:</dt>
                    <dd>{this.resume.skills}</dd>
                </dl>
                <dl className="master-experience">
                    <dt>{this.resume.placeOfWork}
                        <span className="master-experience-dates">{this.resume.yearsWorked}</span>
                    </dt>
                    <dd>{ this.resume.listPoints }</dd>
                </dl>
                 <dl className="master-experience">
                    <dt>{this.resume.school}
                        <span className="master-experience-dates">{this.resume.yearsAttended}</span>
                    </dt>
                    <dd>{ this.resume.degree }</dd>
                </dl>
            </div>

        )
    }
}

    
export default withRouter(Resume)