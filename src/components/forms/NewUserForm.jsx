import React, { Component } from 'react'

let baseURL = ''

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3003';
} else {
    baseURL = 'production URL';
}


class NewUserForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            city: '',
            state: ''
        }
    }


    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(baseURL + '/users', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                city: this.state.city,
                state: this.state.state
            }),
            headers: { 'Content-Type': 'application/json' }

        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res){
                    this.props.setUser(res)
                }
            }).catch(error => console.log({ 'Error': error }));
    }
    
    render() {
        return (
            <div className="form-signup">
                <form onSubmit={this.handleSubmit}>
                    <h2>Welcome</h2>
                    <div className="row">
                        <div className="six columns">
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
                        </div>
                        <div className="six columns">
                            <label htmlFor="password">Password</label>
                            <input onChange = { this.handleChange }
                                type="password"
                                id="password"
                                className="u-full-width"
                                name="password"
                                value={this.state.password}
                                required
                            />
                        </div>
                    </div> 

                    <div className="row">
                        <div className="six columns">
                            <label htmlFor="firstName">First Name</label>
                            <input onChange = { this.handleChange }
                                type="text"
                                id="firstName"
                                className="u-full-width"
                                name="firstName"
                                value={this.state.firstName}
                                // required
                            />
                        </div>
                        <div className="six columns">
                            <label htmlFor="lastName">Last Name</label>
                            <input onChange = { this.handleChange }
                                type="text"
                                id="lastName"
                                className="u-full-width"
                                name="lastName"
                                value={this.state.lastName}
                                // required
                            />
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="five columns">
                            <label htmlFor="address">Address</label>
                            <input onChange = { this.handleChange }
                                type="text"
                                id="address"
                                className="u-full-width"
                                name="address"
                                value={this.state.address}
                            />
                        </div>
                        <div className="five columns">
                            <label htmlFor="city">City</label>
                            <input onChange = { this.handleChange }
                                type="text"
                                id="city"
                                className="u-full-width"
                                name="city"
                                value={this.state.city}
                            />
                        </div>
                        <div className="two columns">
                            <label htmlFor="state">State</label>
                            <input onChange = { this.handleChange }
                                type="text"
                                id="state"
                                className="u-full-width"
                                name="state"
                                value={this.state.state}
                            />
                        </div>
                    </div>

                    {/* <div className="row">
                        <div className="six columns">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                className="u-full-width"
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                            />
                        </div>
                     </div>
                     */}

                    <button className="u-full-width button-primary" type="submit">Sign up</button>
                </form>
            </div>
        )
    }
}
export default NewUserForm