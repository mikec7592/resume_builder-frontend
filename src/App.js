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


let baseURL = '';
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3003';
} else {
    baseURL = 'production URL';
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resumes: [],
      user: {
        token: '',
        firstName: '',
        lastName: '',
      },
      currentForm: ''
    }
  }

  componentDidMount() {
    this.authoerizeUser();
  }
  
  updateDatabase = () => {
    console.log(JSON.stringify({
                user: this.state.user
            }))
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
              console.log(jsonRes)
            }).catch(error => console.log({ 'Error': error }));
    }

  authoerizeUser = () => {
    this.setState({
      user: this.getUser(),
    });
  }

  setUser = (userDetails) => {
    sessionStorage.setItem('user', JSON.stringify(userDetails));
    this.authoerizeUser();
    // history.push('/master')
  }

  getUser = () => {
    const session = JSON.parse(sessionStorage.getItem('user'))
    if (session) {
      return session.user
    }
  }

  clearToken = () => {
    sessionStorage.clear();
    this.setState({
      user: {
        token: undefined,
        firstName: '',
        lastName: '',
      }
      
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

  render() {
    let masterResume;
    if (this.state.user) {
        masterResume = < MasterResume
          name={`${this.state.user.firstName} ${this.state.user.lastName}`}
          masterResume={this.state.user.masterResume}
        /> 
    } else {
        masterResume = <div></div>
    }

    return (  
      <Router history={history}>
        <div className='container'>
          < Header
            user={this.state.user}
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