import React, { Component } from 'react'
import Navbar from '../component/Navbar'
import { NavLink } from 'react-router-dom'
import CartBar from '../component/CartBar'

export default class About extends Component {
  constructor (){
    super()
    this.state = {
      token: "",
      userName: ""
    }
    
    if(localStorage.getItem('token')){
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
      }else{
        window.location = '/signin'
      }
}
  render() {
    return (
        <div>
            <Navbar/>
        <div className="container py-5 my-4">
          <div className="row">
            <div className="col-6">
              <h1 className="display-6 fw-bolder mt-5 mb-4">About TechCo</h1>
              <p className="lead mb-4">
              TechCo is an online course website platform in the IT field that has various class categories, namely coding classes, video editing classes, game development classes, and graphic design classes. TechCo aims to form users, especially Indonesian people who want to learn about the world of Information and Technology. Let's join TechCo!
             </p>
              <NavLink to="/contact" id="blue" className="btn btn-dark px-3">Contact Us</NavLink>
            </div>
            <div className="col-6">
              <img src="https://cdn.dribbble.com/users/2155177/screenshots/7020787/media/8fca7291a5ad29bc696a9bbc6c5dd1c3.png?compress=1&resize=1200x900&vertical=top" id="img" alt="Illus" height="600px" width="800px" />
            </div>
          </div>
        </div>
        <CartBar/>
      </div>
    )
  }
}
