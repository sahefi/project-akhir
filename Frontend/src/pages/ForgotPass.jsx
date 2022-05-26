import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'

export default class ForgotPass extends React.Component {
    constructor() {
        super()
        this.state = {
            email_admin: "",
            password_admin: "",

        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        let data = {
            email_admin: this.state.email_admin,
            password_admin: this.state.password_admin
        }
        if (window.confirm("Are you sure to change password?")) {
            axios.put("http://localhost:8000/admin/", data)
                .then(res => {
                    window.location = '/signin'
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        return (
            <div className="contain"><br /><br /><br /><br />


                <div className="card mx-auto d-block" id="card-forgot">
                    <div className="card-body">
                        <img src="/assets/techlog.png" className="mx-auto d-block mt-4 mb-4" alt="" id="logo" />
                        <h4 className='fs-2 fw-bold text-center'>Forgot Password</h4>
                        <h5 className='fs-6 fw-light text-center mb-5'>Change your password here!</h5>
                        <form  onSubmit={(e) => this.handleSave(e)}  className='ms-5 me-5'>
                            <label htmlFor="" className='mb-2'>Email</label>
                            <input type="email" className='form-control'  value={this.state.email_admin} onChange={this.handleChange} placeholder='Input your email' name="email_admin" required/><br />

                            <label htmlFor="" className='mb-2' >New Password</label>
                            <input type="password" className='form-control' placeholder='Input your new password'  value={this.state.password_admin} onChange={this.handleChange} name="password_admin" required/><br />
                            <input type="submit" className='btn btn-dark w-100' id="blue" value="Change Password"/>
                        </form>
                    </div>
                </div>



            </div>
        )
    }
}
