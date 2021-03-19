import React, { Component } from 'react'
import { Router, Switch, Route } from "react-router-dom";
import history from './components/history';
import Header from './components/Header'
import HomePage from './components/HomePage'

import ResumeForm from './components/forms/ResumeForm'
import Resumes from './components/Resumes'
import Resume from './components/Resume'

import NewUserForm from './components/forms/NewUserForm'
import LoginForm from './components/forms/LoginForm'
import MasterResume from './components/MasterResume';
import TitleForm from './components/forms/TitleForm';
import SummeryForm from './components/forms/SummeryForm';
import SkillsForm from './components/forms/SkillsForm';
import ExperianceForm from './components/forms/ExperianceForm';


let baseURL = '';
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3003';
} else {
    baseURL = 'https://resumebuilderapi.herokuapp.com';
}


class App extends Component {
  constructor(props) {
    super(props)
    this.experienceForm = React.createRef();
    this.state = {
      resumes: [],
      token: {},
      user: {},
      currentForm: '',
      job: ''
    }
  }

  componentDidMount() {
    this.authoerizeUser();
    this.getUser();
  }
  
  updateDatabase = () => {
    // console.log(JSON.stringify({
                // user: this.state.user
            // }))
        // e.preventDefault()
        fetch(baseURL + `/users/` + this.state.user._id, {
            method: 'PUT',
          body: JSON.stringify(
                this.state.user
             ),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
          .then(jsonRes => {
            this.setState({
              user: jsonRes,
            });
            }).catch(error => console.log({ 'Error': error }));
    }

  authoerizeUser = () => {
    this.setState({
      // user: this.getUser(),
      token: JSON.parse(sessionStorage.getItem('token'))
    });
  }

  setUser = (userDetails) => {
    const token = userDetails.user._id
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(userDetails));
    const user = userDetails.user;
    this.setState({user: user})
    this.authoerizeUser();
    history.push('/master')
  }

  getUser = () => {
    const token = JSON.parse(sessionStorage.getItem('token'));
    if (token) {
      console.log('hit')
      fetch(baseURL + `/users/` + token, {
        method: 'GET',
        // body: JSON.stringify(
          // this.state.user
        // ),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.json())
      .then(jsonRes => {
          this.setState({
              user: jsonRes,
            });
          }).catch(error => console.log({ 'Error': error }));
    }
  }

  clearToken = () => {
    sessionStorage.clear();
    this.setState({
      token: undefined,
      user: {}
    })
    history.push('/')
  }

  showForm = () => {
    switch (this.state.currentForm) {
      case 'summery':
        return (< SummeryForm
          summery={this.state.user.masterResume.summery}
          handleSummeryChange={this.handleSummeryChange}
        />);
      case 'title':
        return < TitleForm
          title={this.state.user.masterResume.title}
          handleTitleChange={this.handleTitleChange}
        />;
      case 'skills':
        return < SkillsForm
          skills={this.state.user.masterResume.skills}
          handleSkillsChange={this.handleSkillsChange}
        />;
      case 'experiance':
        return < ExperianceForm
          ref={this.experienceForm}
          experiance={this.state.user.masterResume.experiance}
          handleExperianceAdd={this.handleExperianceAdd}
          handleExperianceUpdate={this.handleExperianceUpdate}
          job={this.state.job}
        />;

      default: return ('')
    }
  }

  handleChangeForm = (form) => {
    this.setState({ currentForm: form });
  }

  handleTitleChange = (newTitle) => {
    const updatedUser = this.state.user;
    updatedUser.masterResume.title = newTitle
    this.setState({
      user: updatedUser
    });
    this.updateDatabase()
  }

  handleSummeryChange = (newSummery) => {
    const updatedUser = this.state.user;
    updatedUser.masterResume.summery = newSummery
    this.setState({
      user: updatedUser
    });
    this.updateDatabase()
  }

  handleSkillsChange = (newSkill) => {
    const updatedUser = this.state.user;
    updatedUser.masterResume.skills = newSkill
    this.setState({
      user: updatedUser
    });
    this.updateDatabase()
  }

  handleExperianceAdd = (newExperience) => {
      const updatedUser = this.state.user;
      updatedUser.masterResume.experience.push(newExperience);
      this.setState({
      user: updatedUser
    });
    this.updateDatabase()
  }
  
  handleExperienceEdit = (job) => {
    console.log(job)
    this.setState({
        job: job
    });
    this.handleChangeForm('experiance')

    // this.experienceForm.current.handleEdit(job)
  }

  handleExperianceUpdate = (job, experiance) => {
    const updatedUser = this.state.user;
      const indexToUpdate = updatedUser.masterResume.experience.indexOf(job);
      updatedUser.masterResume.experience = [
        ...updatedUser.masterResume.experience.slice(0, indexToUpdate),
        experiance,
        ...updatedUser.masterResume.experience.slice(indexToUpdate + 1)
      ]

      this.setState({
      user: updatedUser
    });
    this.updateDatabase()
  }

  handleExperianceDelete = (experience) => {
      const updatedUser = this.state.user;
      const indexToRemove = updatedUser.masterResume.experience.indexOf(experience);
      updatedUser.masterResume.experience = [
        ...updatedUser.masterResume.experience.slice(0, indexToRemove),
        ...updatedUser.masterResume.experience.slice(indexToRemove + 1)
      ]

      this.setState({
      user: updatedUser
    });
    this.updateDatabase()
  }


  render() {
    let masterResume;
    if (this.state.user) {
        masterResume = < MasterResume
          name={`${this.state.user.firstName} ${this.state.user.lastName}`}
          masterResume={this.state.user.masterResume}
          handleChangeForm={this.handleChangeForm}
          handleExperianceDelete={this.handleExperianceDelete}
          handleExperienceEdit={this.handleExperienceEdit}

        /> 
    } else {
        masterResume = <div></div>
    }

    return (  
      <Router history={history}>
        <div className='container'>
          < Header
            user={this.state.user}
            token={this.state.token}
            clearToken={this.clearToken}
            handleChangeForm={this.handleChangeForm}
          />

          <Switch>
            <Route exact path="/">
              <HomePage/>
            </Route>

            <Route exact path="/master">
               <div className="row">
                <div className="six columns">
                  {masterResume}
                  
                  </div>
           
                  <div className="six columns">
                    { this.showForm()}
                  </div>
                </div>
            </Route>

            <Route path="/signup">
              <NewUserForm
                setUser={this.setUser} />
            </Route>
            
            <Route path="/signin"> 
              <LoginForm setUser={this.setUser} />
            </Route>

            <Route exact path="/resumes">
              <Resumes
                user={this.state.user}
                resumes={this.state.resumes}
              />
            </Route>
            
            <Route path="/Resumes/:_id">
              <Resume
                user={this.state.user}
                resumes={this.state.resumes}
              />
            </Route>

            <Route path="/form">
              < ResumeForm
                  user={this.state.user}
                /> 
            </Route>
            </Switch>
          </div>
        </Router>
    )
  }
}
export default App;