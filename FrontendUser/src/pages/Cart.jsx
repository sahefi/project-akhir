import React, { Component } from 'react';
import Navbar from '../component/Navbar';
import { NavLink } from 'react-router-dom'

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            cart: [], // untuk menyimpan list cart
            user: "",
            total: 0, // untuk menyimpan data total belanja
            isCart: false
        }
        if(localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
          }else{
            window.location = '/signin'
          }

    }

    initCart = () => {
        // memanggil data cart pada localStorage
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        // memanggil data user pada localStorage
        let userName = localStorage.getItem("name")
        // kalkulasi total harga
        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += (item.price)
        })
        // memasukkan data cart, user, dan total harga pada state
        this.setState({
            cart: tempCart,
            user: userName,
            total: totalHarga
        })
    }

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Do you want to delete this class from your cart")) {
            // menghapus data
            let tempCart = this.state.cart
            // posisi index data yg akan dihapus
            let index = tempCart.indexOf(item)

            // hapus data
            tempCart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(tempCart))

            this.setState({ cart: tempCart })
        }
    }



    componentDidMount() {
        this.initCart()
    }

    render() {
        return (
            <div>
                <Navbar />
                {this.state.cart.length > 0 &&
                    <div>
                        <div className="container py-4 my-4">

                            <h1 className='fs-5 fw-bolder mt text-left mb-2' id="text-blue">Hi, {this.state.user}</h1>

                            <h1 className="display-6 fw-bold text-left">Here's your cart</h1>
                            {this.state.cart.map((item, index) =>
                            (
                                <div className="px-4 my-5 bg-white rounded-3" key={item.id_class}>
                                    <div className="container py-4">
                                        <div className="row justify-content-center">
                                            <div className="col-md-4">
                                                <img src={"http://localhost:8000/image/class/" + item.image_class} alt={item.name_class} id="img-cart" />
                                            </div>
                                            <div className="col-md-4">
                                                <h3 id="text-blue">{item.name_class}</h3>
                                                <p className="lead fw-bold">
                                                    {item.price}</p>
                                                <button className='btn btn-danger' id="red" onClick={() => this.Drop(item)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}

                        </div>
                        <div className="container">
                            <div className="row">
                                <NavLink to="/checkout" className="btn btn-dark mb-5 w-25 mx-auto" id="dark">Proceed To Checkout</NavLink>
                            </div>
                        </div>
                    </div>
                }

                {this.state.cart.length === 0 &&
                    <div className="container py-4 my-4">
                        <h1 className='fs-5 fw-bolder mt text-left mb-2' id="text-blue">Hi, {this.state.user}</h1>

                        <h1 className="display-6 fw-bold text-left">Your cart is empty</h1>
                    </div>
                }


            </div>
        );
    }
}

export default Cart;