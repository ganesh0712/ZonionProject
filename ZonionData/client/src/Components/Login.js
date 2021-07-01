import React, { Component } from 'react'
import Dashboard from './Dashboard';
import axios from "axios"
import '../style/Login.css'
import Navbar from './Navbar';
export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            isLoggedin: false
        }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handelSubmit = (e) => {
        e.preventDefault();
        const adminData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:8000/login', adminData)
            .then(res => {
                console.log(res)
                localStorage.setItem('jwtToken', res.data.token)
                localStorage.setItem('adminName', res.data.name)

                this.props.history.push('/dashboard')
            })
            .catch(err => {
                alert('please enter correct Details')
            })





    }


    render() {

        return (
            <div>
                <Navbar />
                <div className="container login-border"
                    style={{

                        "justifyContent": "center",
                        "alignItems": "center",
                        height: 570,
                        width: 500
                    }}
                >
                    <form style={{
                        marginTop: 150,
                        border: "10px solid rgb(194, 194, 194)"
                    }}>

                        <h3>Log in</h3>
                        <br />
                        <div className="form-group">
                            <label style={{ textAlign: "end" }}>Email id : </label>
                            <input type='text'
                                className="form-control"
                                name='email'
                                placeholder='enter Email ID'
                                value={this.state.email}
                                onChange={this.onChangeHandler} />
                        </div>
                        <br /><br />
                        <div className="form-group">
                            <label>Password</label>
                            <input type='password'
                                className="form-control"
                                name='password'
                                placeholder='Enter Password'
                                value={this.state.password}
                                onChange={this.onChangeHandler} />
                        </div>

                        <div className="form=group" style={{ "marginTop": 20 }}>
                            <button type="submit" className="btn btn-dark btn-lg btn-block"
                                onClick={this.handelSubmit}>Sign in</button>
                            <br />
                        </div>
                    </form>



                </div>
            </div>

        )

    }
}

export default Login
