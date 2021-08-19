import React, { Component } from 'react'
import './Login.css'
import fire from '../../Config/Firebase.js';

export class Register extends Component {
    state = {
        email: '',
        password: '',
        displayName: '',
        fireErrors: ''
    }

    register = e => {
        e.preventDefault(); 
        fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((user) => {
            var currentUser = fire.auth().currentUser;
            currentUser.updateProfile({
                displayName: this.state.displayName
            })
        }).catch((error) => {
            this.setState({
                fireErrors: error.message
            })
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    render() {

        let errorNotification = this.state.fireErrors ? (<div className="error">{this.state.fireErrors}</div>) : null;
        return (
            <>
                {errorNotification}
                <form>
                    <input type="text" className="regField" placeholder="Your Name"
                    onChange={this.handleChange}
                    value={this.state.displayName} name="displayName" />
                    <input type="text" className="regField" placeholder="Email"
                    onChange={this.handleChange}
                    value={this.state.email} name="email" />
                    <input type="password" className="regField" placeholder="Password"
                    onChange={this.handleChange}
                    value={this.state.password} name="password" />
                    <input onClick={this.register}type="submit" className="submitBtn" value="REGISTER" />
                </form>   
            </>
        )
    }
}

export default Register
