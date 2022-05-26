import React, { Component } from 'react';
import Navbar from '../component/Navbar';
import CartBar from '../component/CartBar';

class Contact extends Component {
    constructor() {
        super()
        this.state = {
            token: "",
            userName: ""
        }

        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            this.state.userName = localStorage.getItem('name')
        } else {
            window.location = '/signin'
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col-12 py-4 my-4">
                            <h1 className='fs-5 fw-bolder mt text-left mb-3' id="text-blue">_________ Contact Us</h1>
                            <h1 className='display-6 fw-bold mt text-left'>Let's get in touch</h1>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-6">
                            <form>
                                <div className="mb-3">
                                    <label for="exampleForm" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="exampleForm" placeholder="Leisya Vann Jess" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleForm" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="leisya@gmail.com" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">Message</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <button type="submit" className="btn btn-dark" id="blue">Send<i className="fa fa-paper-plane ms-2"></i></button>
                            </form>
                        </div>
                        <div className="col-md-5 d-flex justify-content-center" id="contact">
                            <img src="https://cdn.dribbble.com/users/877246/screenshots/15655386/media/aaeec8419786cdfbc6de5d12452636d1.png?compress=1&resize=1200x900&vertical=top" id="illusContact" />
                        </div>
                    </div>
                </div>
                <CartBar />
            </div>
        );
    }
}

export default Contact;