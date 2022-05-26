import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Navbar from '../component/Navbar'
import axios from 'axios'
import CartBar from '../component/CartBar';
import { Link, NavLink } from 'react-router-dom'

export default class Category extends Component {
    constructor() {
        super()
        this.state = {
            category: [],
            token: "",
            name: "",
            image: "",
            description: "",
            id_category: 0,
            action: "",
            search: ""
        }

        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        } else {
            window.location = '/siginin'
        }
    }

    


    getCategory = () => {
        let url = "http://localhost:8000/course/"
        axios.get(url)
            .then(res => {
                this.setState({
                    category: res.data.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    

    
    

    findCategory = (event) => {
        let url = "http://localhost:8000/course/find";
        if (event.keyCode === 13) {
            // menampung data keyword pencarian
            let form = {
                find: this.state.search
            }
            // mengakses api untuk mengambil data pegawai
            // berdasarkan keyword
            axios.post(url, form)
                .then(response => {
                    // mengisikan data dari respon API ke array pegawai
                    this.setState({ category: response.data.result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    


    componentDidMount() {
        this.getCategory()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className="display-6 fw-light text-left">Model Sepatu</h1>

                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Cari..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findCategory} />

                        </div>
                    
                    </div>
                    <div className="row ">
                        {this.state.category.map((item, index) => {
                            return (
                                <div className="col-md-3 mb-4 py-1 my-1" id="p" key={index}>
                                    <div className="card h-100 text-left rounded" id="card-category">
                                        <img src={"http://localhost:8000/image/course/" + item.image} className="card-img-top" alt={item.name} id="pic-category" />
                                        <div className="card-body">
                                            <h5 className="card-title mb-1 fs-5 fw-bold">{item.name}</h5>
                                            <p className="card-text lead fw-light fs-6" id="desc-category">{item.description}</p>
                                            <NavLink className="btn btn-sm btn-dark m-1" id="dark" to={`/category/${item.id_category}`}>Go</NavLink>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
                <CartBar/>
            </div>
        )
    }
}
