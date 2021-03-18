import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import NewUserForm from './forms/NewUserForm'

class Header extends Component{
    constructor(props) {
        super(props)
        this.state = {
            masterDropdown: false,
        }
    }

    handleDropdown = () => {
        if (this.state.masterDropdown) {
            this.setState({ masterDropdown: false });
        } else {
            this.setState({ masterDropdown: true });
        }
    }

    render() {
        return (
            <header>
                <nav className="nav-main">
                    <div>
                        <a className="logo" href='/'><h1>Resume Builder</h1></a>
                        
                        
                        {this.props.user !== null && this.props.user ?
                            <React.Fragment>

                            <ul>
                            <li>
                                <button to="/" className="button master-dropdown-button" onClick={this.handleDropdown}>Master Resume </button>
                                {this.state.masterDropdown ?
                                    <div className="master-dropdown">
                                        <ul className="dropdown">
                                            <li><button onClick={() => { this.props.handleChangeForm('summery') } }>Summery</button></li>
                                            <li><button onClick={() => { this.props.handleChangeForm('title') }}>Title</button></li>
                                        </ul>
                                    </div>
                                    : ''}  
                            </li>
                        </ul>

                        <div className="signin-buttons">
                            <button onClick={ this.props.clearToken } className="button"> Log out </button>
                        </div>
                            
                                
                            </React.Fragment>
                            :
                            <div className="signin-buttons">
                                <Link to="/signup" className="button button-primary" >Sign Up</Link>
                                <Link to="/signin" className="button"> Log In </Link>
                            </div>
                            
                            }
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header