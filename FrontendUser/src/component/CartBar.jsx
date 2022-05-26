import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'


export default class CartBar extends Component {
  render() {
    return (
      <div class="sosbar">
        <NavLink to="/cart"><i class="fa fa-shopping-cart"></i></NavLink>
      </div>
    )
  }
}
