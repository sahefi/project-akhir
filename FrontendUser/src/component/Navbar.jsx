import { css } from 'jquery';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {
 out = () => {
  if (window.confirm("Are you sure to logout?")) {
   window.location = '/signin'
   localStorage.removeItem("name");
   localStorage.removeItem("user");
   localStorage.removeItem("token");
   localStorage.removeItem("id");
   localStorage.removeItem("class");
  }
 }
  

  render() {
    return (
        <div>
        <nav className="bg-gray-50 drop-shadow-md md:drop-shadow-xl">
          <div className="max-w-7xl mx-5 px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 text-decoration-line: none hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                  <span className="sr-only">Buka Pilihan</span>
  
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
  
                  <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start mr-10">
                <div className="flex-shrink-0 flex items-center mr-10">
                <h1>Shoez</h1>
                </div>
                <div className="hidden sm:block sm:ml-10 mx-10">
                  <div className="menu flex space-x-4 ml-10">
                    <NavLink to="/" className="no-underline ml-10 text-gray-800 hover:bg-red-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium " aria-current="page">Dashboard</NavLink>
                    <NavLink to="/category" className="no-underline text-gray-800 hover:bg-red-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium " aria-current="page">Category</NavLink>
                    <NavLink to="/profile" className="no-underline text-gray-800 hover:text-red-900 px-3 py-0 px-1 rounded-md text-2xl font-medium " aria-current="page" id="profile"><i className="fa fa-user me-1 "></i></NavLink>
                    
                    <button onClick={() => this.out()} className="no-underline text-gray-800 px-1 py-0 hover:text-blue-900 rounded-md text-2xl font-medium" aria-current="page" > <i className="fa fa-sign-out me-1 "></i></button>
                  </div>
  
                </div>
  
              </div>
  
            </div>
          </div>
        </nav>
        <div>
        </div>
      </div>
    )
  }
}

