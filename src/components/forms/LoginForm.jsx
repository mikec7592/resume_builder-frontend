import React, { Component } from 'react'

let baseURL = ''

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3003';
} else {
    baseURL = 'production URL';
}


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }


    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // fetch(baseURL + '/users/register', {
        fetch(baseURL + '/sessions', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
            headers: { 'Content-Type': 'application/json' }

        })
            .then(res => res.json())
            .then(res => {
                this.props.setUser(res)
            }).catch(error => console.log({ 'Error': error }));
    }
    
    render() {
        return (
            <div className="form-signin">
                <form onSubmit={this.handleSubmit}>
                    <h2>Welcome Back</h2>
                    <div className="row">

                     </div>   
                    <label htmlFor="username">Username</label>
                    <input onChange = { this.handleChange }
                        type="text"
                        id="username"
                        className="u-full-width"
                        name="username"
                        value={this.state.username}
                        required
                        autoFocus
                    />
                
                    <label htmlFor="password">Password</label>
                    <input onChange = { this.handleChange }
                        type="password"
                        id="password"
                        className="u-full-width"
                        name="password"
                        value={this.state.password}
                        required
                    />

                    <button className="u-full-width button-primary" type="submit">Log In</button>
                </form>
            </div>
        )
    }
}

export default Login